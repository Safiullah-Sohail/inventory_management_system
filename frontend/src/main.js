import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import routes from './routes';

import 'vuetify/styles';
import vuetify from './plugins/vuetify';

import Vue3Toastify, { toast, updateGlobalOptions } from 'vue3-toastify';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import CommonMixin from './Mixins/CommonMixin';

import store from './store';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:9000/api/v1'

const app = createApp(App, {
    components,
    directives,
});

// Vue Router Documentation https://v3.router.vuejs.org/installation.html#npm
const router = new createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach((to, from, next) => {
    if (to.matched.some((rec) => !rec.meta.authNotRequired)) {
        if (localStorage.getItem('token')) return next();
        return next({ name: 'login' });
    } else if (to.matched.every((rec) => rec.meta.authNotRequired)) {
        if (localStorage.getItem('token'))
            return next({ name: from.name || 'dashboard' });
        return next();
    }
    next();
});


app.use(store);
app.use(router);
app.use(vuetify);
app.mixin(CommonMixin);

const defaultOptions = {
    newestOnTop: true,
    autoClose: 2500,
    theme: 'colored',
    position: toast.POSITION.TOP_RIGHT,
    clearOnUrlChange: false,
};
app.use(Vue3Toastify, {
    ...defaultOptions,
    style: {
        opacity: '1',
        userSelect: 'initial',
    },
});
updateGlobalOptions({
    ...defaultOptions,
    style: {
        opacity: '1',
        top: '1%',
        userSelect: 'initial',
    },
});

app.mount('#app');
