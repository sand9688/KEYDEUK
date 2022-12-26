import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router/router';


const store = createStore({
  state:{
    test:'test',
    form:{
      id:'',
      token:'',
    },
    changeid: ''
    ,
    testResult:''
  },
  getters: {
    getData() {
      return sessionStorage.getItem("test");
    }
  },
  mutations:{
    changeName(state,payload){
      state.changeid = payload
    },
    setMore(payload){
      console.log(payload)
      sessionStorage.setItem('test',payload)
    },
    setLog(state, payload){
      state.form.id = payload.id
      state.form.token = payload._id
      router.push('/user')
    },
    loGout(){
      sessionStorage.clear('userId')
      sessionStorage.clear('token')
      sessionStorage.clear('name')
      sessionStorage.clear('teamName')
    },
  },
  actions:{
    getData(context){
      axios.get('/api/user')
      .then((res)=>{
        context.commit('setMore', res.data)
      })
    },
    changeName(context){
      context.commit('changeName')
    },
    loGin(context,payload){
      axios.post('api/user/login',payload)
      .then((res)=>{
        console.log(res.data)
        sessionStorage.setItem('id', res.data.id)
        sessionStorage.setItem('token', res.data._id)
        sessionStorage.setItem('name', res.data.name )
        sessionStorage.setItem('teamName', res.data.teamName )
        context.commit('setLog',res.data)
      })
      .catch(err => {
        alert(err.response.data.message)
      })
    },
    loGout(context){
      context.commit('loGout')
    },
    changePassword(payload){
      sessionStorage.setItem('changeID', payload)
    }
    
  }

})

export default store;