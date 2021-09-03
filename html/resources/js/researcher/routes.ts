export const ResearchRoutes = {
    path: '/investigadores',
    name: 'Profesor-Investigador',
    icon: 'fa-microscope',
    meta: {title: 'Profesor-Investigador'},
    component: () => import('./researcher.module.vue'),
    children: [
        {
            name: 'Gestión',
            path: '',
            component: () => import('./researcher/index.vue')
        }
    ]
};
