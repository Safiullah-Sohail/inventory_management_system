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
                primary30: '#6a81eb',
                // textField: '#f6f7fb',
                textField: '#e5e5e5',
                primaryText: '#53545C',
                secondaryText: '#2C2D33',
                error: '#CC5F5F',
                darkGray: '#45464E',
                lightGrayText: '#8B8D97',
                lightGray: '#dbdbde',
            },
        };
    },
    computed: {
        $toast() {
            return {
                success: toast.success,
                warning: toast.warning,
                error: toast.error,
                info: toast.info,
            };
        }
    },
    methods: {
        getTitle,
        async formValidationChecker(formRef) {
            let isValid = true;
            await formRef?.validate().then(response => {
                const errors = response.errors;
                isValid = response.valid;
                if (errors.length) {
                    this.errorMessage = errors[0].errorMessages[0];

                    if (this.errorMessage.includes('required')) {
                        this.$toast.error(`${errors[0].id} is required!`);
                        return;
                    }
                    this.$toast.error(`${this.errorMessage}`);
                }
            })
            return isValid;
        },
    },
    created() {
        const title = getTitle(this);
        if (title) {
            document.title = `${title} - ${APP_PREFIX}`;
        }
    },
};