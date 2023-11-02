import { APP_PREFIX } from './enums';
import LoginPage from './pages/LoginPage.vue';
import SignupPage from './pages/SignupPage.vue';
import LayoutPage from './pages/LayoutPage.vue';
import DashBoardPage from './pages/MainPages/DashboardPage.vue';
import SalesAndOrderPage from './pages/MainPages/SalesAndOrderPage.vue';
import SuppliersPage from './pages/MainPages/SuppliersPage.vue';
import InventoryPage from './pages/MainPages/InventoryPage.vue';
import SettingsPage from './pages/MainPages/SettingsPage.vue';

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
            pageTitle: APP_PREFIX,
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
                path: 'sales-and-orders',
                component: SalesAndOrderPage,
                name: 'salesAndOrders',
                meta: {
                    pageTitle: 'Sales and Orders'
                },
            },
            {
                path: 'suppliers',
                component: SuppliersPage,
                name: 'suppliers',
                meta: {
                    pageTitle: 'Suppliers'
                },
            },
            {
                path: 'inventory',
                component: InventoryPage,
                name: 'inventory',
                meta: {
                    pageTitle: 'Inventory'
                },
            },
            {
                path: 'settings',
                component: SettingsPage,
                name: 'settings',
                meta: {
                    pageTitle: 'Settings'
                },
            },
            {
                path: '*',
                redirect: '/dashboard',
            },
        ]
    },
];
