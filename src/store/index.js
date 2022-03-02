import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    phone: "",
    email: "",
    referrer: null
  },
  getters: {
    
  },
  mutations: {
    setEmail(state, email){
      state.email = email;
    },
    setReferrer(state, referrer){
      state.referrer = referrer;
    },
    setPhone(state, phone){
      state.phone = phone;
    }
  },
  // localhost:8080?referal_code=abcd
  actions: {
    async postEntry({ commit, state }, { phone, email, referrer }) {
      commit("setEmail", email);
      commit("setPhone", phone);
      if(referrer)
      {
        commit("setReferrer", referrer)
      }
      var res = await axios.post('/addToWaitlist', {
        email: state.email,
        phone: state.phone,
        referrer: state.referrer
      });
      console.log(res);
      return res;
      // console.log(state.email, state.phone);
    },
  },
});
