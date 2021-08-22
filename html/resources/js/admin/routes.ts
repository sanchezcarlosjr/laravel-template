export const AdminRoutes = {
    path: '/usuarios',
    name: 'Usuarios',
    icon: 'fa-users',
    meta: {
        title: 'Usuarios',
        requiresAuth: true,
    },
    component: () => import('./admin.module.vue'),
    children: [
        {
            path: '',
            name: 'Gestión',
            component: () => import('./users/index.vue')
        },
        {
            name: 'Permisos',
            path: 'permisos',
            component: () => import('./permissions/index.vue')
        }
    ],
};
