import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    userInfo: {}
  },
<<<<<<< HEAD
  getters:{
    isLogin(state){
      return !!Object.keys(state.userInfo).length;
    }
  },
  mutations:{
    chnageUserInfo(state, data){
      state.userInfo = data;
=======
  mutations:{
    changeUserInfo(state, userInfo){
      state.userInfo = userInfo;
>>>>>>> again2
    }
  },
  actions:{}
})

export default store;