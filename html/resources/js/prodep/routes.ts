export const ProdepRoutes = {
    path: '/prodep',
    name: 'PRODEP',
    icon: 'fa-university',
    meta: {title: 'PRODEP'},
    component: () => import('./prodep.module.vue'),
    children: [
        {
            name: 'Gestión de perfiles PRODEP',
            path: '',
            component: () => import('./prodep/index.vue')
        },
        {
            name: 'Apoyos',
            path: 'apoyos',
            component: () => import('./helps/index.vue'),
            meta: {
                requiresAuth: true,
            }
        }
        ,
        {
            name: 'NPTCS',
            path: 'nptcs',
            component: () => import('./nptcs/index.vue')
        }
    ],
};
