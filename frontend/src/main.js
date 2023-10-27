import { createApp } from 'vue';
import App from './App.vue';

import 'vuetify/styles';
import vuetify from './plugins/vuetify';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import CommonMixin from './Mixins/CommonMixin';

const app = createApp(App, {
  components,
  directives,
});

app.mixin(CommonMixin);
app.use(vuetify);

app.mount('#app');
