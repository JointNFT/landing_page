import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		phone: '',
		email: '',
		referrer: null,
		otp: '',
	},
	getters: {},
	mutations: {
		setEmail(state, email) {
			state.email = email;
		},
		setReferrer(state, referrer) {
			state.referrer = referrer;
		},
		setPhone(state, phone) {
			state.phone = phone;
		},
		setOTP(state, otp) {
			state.otp = otp;
		},
	},
	// localhost:8080?referal_code=abcd
	actions: {
		async postEntry({ commit, state }, { phone, email, referrer }) {
			commit('setEmail', email);
			commit('setPhone', phone);
			if (referrer) {
				commit('setReferrer', referrer);
			}
			axios
				.post('http://localhost:3000/addToWaitlist', {
					email: state.email,
					phone: state.phone,
					referrer: state.referrer,
				})
				.then(function (res) {
					console.log(res);
				})
				.catch(function (error) {
					console.log(error);
				});
			// console.log(state.email, state.phone);
		},
		async otpEntry({ commit, state }, { otp, phone }) {
			commit('setOTP', otp);
			commit('setPhone', phone);
			axios
				.post('http://localhost:3000/otpVerify', {
					otp: state.otp,
					phone: state.phone,
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
