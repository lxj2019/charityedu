import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    userInfo: localStorage.getItem('UserInfo')!='undefine' ? JSON.parse(localStorage.getItem('UserInfo')||'{}'):{},
    Token:''||localStorage.getItem('Token')
  },
  mutations:{
    getLogin(state,preload){
      console.log(preload.data);
      state.userInfo=preload.data;
      // state.Token=preload.Token;.
      const Token='1'
      localStorage.setItem('UserInfo',JSON.stringify(preload.data))//将用户信息保存到本地
      localStorage.setItem('Token',Token) //将Token保存到本地
      console.log(localStorage);
      console.log(state);
      console.log(state.userInfo);
    }
  },
  getters:{
    hasTeacherGrant(){
      return this.state.user.grant=='teacher';
    },
    getUser(state){
      if(!localStorage.getItem('UserInfo'))
       return {
            userid: "",
            password: "",
            username: "",
            sex: "",
            grant: "",
            schoolclass: "",
            schoolgrade: "",
            birthday: "",
            region: "",
            phonenum: "",
            mail: ""
        }
        else return JSON.parse(localStorage.getItem('UserInfo'))
      }
  }


})
export default store
