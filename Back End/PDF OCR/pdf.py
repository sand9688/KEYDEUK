from PIL import Image
import pytesseract
from pdf2image import convert_from_path
import matplotlib.pyplot as plt
import os

#pdf => image convert
# poppler_path = r'C:\Workspace\PDF\poppler-22.04.0\Library\bin'
# pdf_path = r'C:\Workspace\PDF\TEST.pdf'
# pages = convert_from_path(pdf_path=pdf_path,poppler_path=poppler_path)
# save_folder = r'C:\Workspace\PDF'
# c = 1
# for page in pages:
#     img_name = f'img-{c}.jpeg'
#     page.save(os.path.join(save_folder, img_name), "JPEG")
#     c+=1

# OCR 부분

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'


text = pytesseract.image_to_string(Image.open('img-1.jpeg'), lang='eng+kor')



print(text.replace(" ", ""))
