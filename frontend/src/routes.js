import LoginPage from './pages/LoginPage.vue';
import SignupPage from './pages/SignupPage.vue';
import LayoutPage from './pages/LayoutPage.vue';
import DashBoardPage from './pages/DashboardPage.vue';

export default [
    {
        path: '/:catchAll(.*)',
        redirect: 'login', // Redirect to the login page
    },
    {
        path: '/login',
        component: LoginPage,
        name: 'login',
        meta: {
            authNotRequired: true,
            pageTitle: 'Login'
        },
    },
    {
        path: '/sign-up',
        component: SignupPage,
        name: 'sign-up',
        meta: {
            authNotRequired: true,
            pageTitle: 'Sign Up'
        },
    },
    {
        path: '/',
        component: LayoutPage,
        name: 'index',
        meta: {
            pageTitle: 'Inventory Management System',
        },
        children: [
            {
                path: 'dashboard',
                component: DashBoardPage,
                name: 'dashboard',
                meta: {
                    pageTitle: 'Dashboard'
                },
            },
            {
                path: '*',
                redirect: '/dashboard',
            },
        ]
    },
];
