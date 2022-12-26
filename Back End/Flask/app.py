import os
from flask import Flask, flash, request, redirect, url_for, render_template, jsonify
from werkzeug.utils import secure_filename
from pdf2image import convert_from_path
import cv2
import pandas as pd
import poppler
from pandas.core import series
from paddleocr import PPStructure, save_structure_res
from glob import glob
import shutil
import pymongo
from pymongo import MongoClient
from flask_pymongo import PyMongo
import certifi
from bson import json_util
from pymongoarrow.monkey import patch_all
import json
from bson import ObjectId
from bson.json_util import dumps
from datetime import datetime


app = Flask(__name__)

app.config['MONGO_URI'] = 'mongodb+srv://root:1234@testcluster.o2nh0nj.mongodb.net/test'

mongo = PyMongo(app)

ca = certifi.where()
client =  MongoClient('mongodb+srv://root:1234@testcluster.o2nh0nj.mongodb.net/?retryWrites=true&w=majority',tlsCAFile=ca)
db = client.get_database('Test')
d_db=client.Test

cl= db.get_collection('DF') 
d_cl = d_db.DF



UPLOAD_FOLDER = 'save'
ALLOWED_EXTENSIONS = {'pdf'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
           
#HTML 렌더링(구동용)
@app.route('/')
def home_page():
	return render_template('home.html')


#pdf 수신 및 ocr 후 키워드행 출력 / json 파일을 몽고db로 송신
@app.route('/func/pdf')
def pdf():
    if request.method == 'GET':
        
        name = request.args.get('file')
        pdf = 'C:/Users/Geon/Desktop/rowdata/'+ name
        images = images = convert_from_path(pdf,poppler_path="C:/Users/Geon/Desktop/poppler-22.11.0/Library/bin")
        try:
            if not os.path.exists('TEST/sample'):
                os.makedirs('TEST/sample')
            for i in range(len(images)):
                images[i].save(f'TEST/sample/{i}'+'.jpg','JPEG')
        except:
            for i in range(len(images)):
                images[i].save(f'TEST/sample/{i}'+'.jpg','JPEG')
        
        
        for i in range(len(images)):
            #sample이 저장 되는 곳
            val_img_path = f'C:/Users/Geon/Desktop/FinalProject/TEST/sample/{i}'+'.jpg'
            #yolo에서 구동된 가장 좋은 값 서치
            weight_path = 'C:/Users/Geon/Desktop/FinalProject/best.pt'
            #table 사진 저장
            save_name= f'C:/Users/Geon/Desktop/FinalProject/TEST/yolo/table{i}'
            #yolo5 설정
            os.system(f'python yolov5/detect.py --weights {weight_path} --img 416 --conf 0.60 --source {val_img_path} --save-conf  --save-crop --save-txt --project /result --name {save_name}')
            
        
        try:
            if not os.path.exists('TEST/yolo'):
                os.makedirs('TEST/yolo') 
                
        except:
            pass
            
        folder_list = os.listdir('TEST/yolo/')
        img_list=[]
        for i in folder_list:
            #corb 서치
            a=glob(f'TEST/yolo/{i}/crops/bordered/*.jpg')
            for j in a:
                if len(a) > 0:
                    img_path = f'{j}'
                    img_path = img_path.replace('\\','/')
                    img_list.append(img_path)
                    
        
        try:
            if not os.path.exists('TEST/ocr'):
                os.makedirs('TEST/ocr')
        except:
            pass
        
        table_engine = PPStructure(layout=False, show_log=True )
        save_folder = 'TEST/ocr'
        for i in range(0,len(img_list),1):
            img = cv2.imread(img_list[i])
            result = table_engine(img)
            save_structure_res(result, save_folder, os.path.basename(img_list[i]).split('.')[0])

            for line in result:
                line.pop('img')
        d_cl.delete_many({})
        a = []
        b = []
        time = datetime.now()
        row = {
                'name' : name,
                'date' : time,
                'data' : {
                'table' : b
            }
        }
        for currentdir, dirs, files in os.walk(r"TEST/ocr"):
            for file in files :
                if file.endswith('.xlsx'):
                    #몽고db에 저장단계 / row에 table 만들어서 넣어줌                
                    df = pd.read_excel(currentdir+r"/"+file)
                    df = df.fillna(method='ffill')
                    df = df.dropna(axis=0)
                    json  = df.to_json(orient='records')
                    b.append(json)

                    #한번 더 읽어 들여서 1열 2열 출력
                    for i in range(2):
                        df = pd.read_excel(currentdir+r"/"+file,usecols=[i])
                        df = df.fillna(method='ffill')
                        df = df.dropna(axis=0)
                        val_list = df.values.tolist()
                        for j in val_list:
                            a.append(j[0])
        #몽고db에 저장           
        d_cl.insert_one(row)
        
        
        #작업 완료 후 폴더 삭제(TEST 폴더도 생성 및 삭제 할까 고민 중)
        shutil.rmtree(r'TEST/sample')  
        shutil.rmtree(r'TEST/yolo')  
        shutil.rmtree(r'TEST/ocr')
                    
        return  a
        
#검색 단계 - 검색어 발송
@app.route('/func/search')
def serch():
    return render_template("search.html")


#검색어 수신 후 몽고db에서 검색어가 포함된 json을 전송
@app.route('/func/find')
def find():
   
    if request.method=='GET':
        while True:
            x = request.args.get('keyword') #name = request.args.get('file')
            try:
                x=int(x)
                break
            except:
                x
                break
    
        rows = d_cl.find({})
        
        AA = []
        query = {}
        dump_row = dumps(rows)
        rows = json.loads(dump_row)
        totalCount = d_cl.count_documents(query)
        for j in range(totalCount):
            for i in range(len(rows[j]['data']['table'])):
                data = json.loads(rows[j]['data']['table'][i])
                data = pd.DataFrame(data)
                data = data.fillna(method = 'ffill')
                data = data.dropna(axis=0)
                findResult = data.isin([x])
                series_findResult = findResult.any()
                df_cols=list(series_findResult[series_findResult==True].index)
                df_rows = []
                for col in df_cols:
                    df_rows.append(list(findResult[col][findResult[col]==True].index))
                    cc = data.loc[df_rows[0]] 
                    cc = cc.to_json(orient='records')
                    AA.append(cc)

                    
                    
    return AA



if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)