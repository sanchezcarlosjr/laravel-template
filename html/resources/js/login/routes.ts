export const LoginRoutes = {
    path: '/',
    name: 'login',
    meta: {title: 'Inicio de sesión en SIIIP'},
    component: () => import('./index.vue')
};
