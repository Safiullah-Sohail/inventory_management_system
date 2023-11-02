import { startCase } from 'lodash';
import { APP_PREFIX } from '@/enums';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

function getTitle(vm) {
    const { title } = vm.$options;
    if (title) {
        return typeof title === 'function'
            ? title.call(vm)
            : title;
    }

    if (!vm.$route) {
        return null;
    }

    if (vm.$route.meta?.pageTitle) {
        return vm.$route.meta.pageTitle;
    }

    return startCase(vm.$route.name);
}

export default {
    data() {
        return {
            APP_PREFIX,
            colorScheme: {
                primary: '#5570F1',
                textField: '#f6f7fb',
                error: '#CC5F5F',
                darkGray: '#45464E',
                lightGray: '#dbdbde',
            },
        };
    },
    computed: {
        $toast() {
            return {
                success: toast.success,
                error: toast.error,
                info: toast.info,
            };
        }
    },
    methods: {
        getTitle,
    },
    created() {
        const title = getTitle(this);
        if (title) {
            document.title = `${title} - ${APP_PREFIX}`;
        }
    },
};