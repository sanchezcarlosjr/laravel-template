export const EmployeeRoutes =
    {
        path: '/empleados',
        name: 'Empleados',
        icon: 'fa-address-card',
        meta: {title: 'Empleados'},
        component: () => import('./index.vue')
    }
