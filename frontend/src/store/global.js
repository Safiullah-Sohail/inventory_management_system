import axios from 'axios';
/* eslint-disable */

const AuthToken = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = AuthToken;
axios.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.common['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

export const state = () => ({
	user: null,
});

export const mutations = {
	SET_ME(state, payload) {
		state.user = payload;
	},

	SET_USER(state, payload) {
		state.user = payload.user;
		localStorage.setItem('token', payload.token);
		localStorage.setItem('user', JSON.stringify(payload.user));
	},

	SET_LOGGED_IN_USER(state, payload) {
		state.user = payload.user;
	},

	
};

export const actions = {
	async getMe({ commit }) {
		const response = await axios.get('/me');
		commit('SET_ME', response.data.data.user);
		return response.data.data.user;
	},

	async login({ commit, state }, payload) {
		const response = await axios.post('/login', payload);
		commit('SET_USER', response.data.data);
	},

	async signUp({ commit }, payload) {
		const response = await axios.post('/signup', payload);
		commit('SET_USER', response.data.data);
		return response;
	},

	async fetchLoggedInUser({ commit }, forceRefresh = false) {
		if (!forceRefresh && state.user) {
			return;
		}
		const response = await axios.get('/me');
		commit('SET_LOGGED_IN_USER', response.data);
		return response.data;
	},
};

function convertFullName(firstName, lastName) {
	firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
	lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
	return `${firstName} ${lastName}`;
}

export default {
	state,
	mutations,
	actions,
};
