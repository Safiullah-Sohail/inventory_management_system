import { createStore } from 'vuex';
import { state, mutations, actions } from './global';

import globalStore from './global';

export default createStore({
	modules: {
		global: {
			namespaced: true,
			...globalStore,
		},
	},
	...globalStore,
});
