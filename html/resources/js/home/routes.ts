export const HomeRoutes =
    {
        path: '/inicio',
        name: 'Inicio',
        icon: 'fa-home',
        meta: {title: 'Inicio'},
        component: () => import('./home.component.vue')
    }

