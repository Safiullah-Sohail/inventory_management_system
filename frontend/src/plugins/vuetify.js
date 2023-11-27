import { createVuetify } from 'vuetify';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import '@mdi/font/css/materialdesignicons.css';

import * as VuetifyComponents from 'vuetify/lib/labs/components.mjs';

export default createVuetify({
    components: {
        ...components,
        ...VuetifyComponents,
    },
    directives,
    icons: {
        defaultSet: 'mdi',
    },
});
