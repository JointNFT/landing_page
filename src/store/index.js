import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    phone: "",
    email: ""
  },
  getters: {
    
  },
  mutations: {
    setEmail(state, email){
      state.email = email;
    },
    setPhone(state, phone){
      state.phone = phone;
    }
  },
  actions: {
    async postEntry({ commit, state }, { phone, email }) {
      commit("setEmail", email);
      commit("setPhone", phone);
      axios.post('http://localhost:3000/addToWaitlist', {
        email: state.email,
        phone: state.phone,
        referrer: "test"
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
      // console.log(state.email, state.phone);
    },
  },
});

// Mohammad 9409308782