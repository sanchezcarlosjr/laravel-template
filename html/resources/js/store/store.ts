import Vue from "vue";

const state = Vue.observable({
    user: {
        name: '',
        token: '',
        id: '',
        permissions: {
            "/inicio": {
                "module": "/inicio",
                "create": false,
                "edit": false,
                "read": true,
                "destroy": false
            },
            "/cuerpos-academicos": {
                "module": "/cuerpos-academicos",
                "create": false,
                "edit": false,
                "read": true,
                "destroy": false
            },
            "/cuerpos-academicos/miembros": {
                "module": "/cuerpos-academicos/miembros",
                "create": false,
                "edit": false,
                "read": false,
                "destroy": false
            },
            "/cuerpos-academicos/lgac": {
                "module": "/cuerpos-academicos/lgac",
                "create": false,
                "edit": false,
                "read": false,
                "destroy": false
            },
            "/cuerpos-academicos/evaluaciones": {
                "module": "/cuerpos-academicos/evaluaciones",
                "create": false,
                "edit": false,
                "read": false,
                "destroy": false
            },
            "/cuerpos-academicos/redes": {
                "module": "/cuerpos-academicos/redes",
                "create": false,
                "edit": false,
                "read": false,
                "destroy": false
            },
            "/cuerpos-academicos/apoyos": {
                "module": "/cuerpos-academicos/apoyos",
                "create": false,
                "edit": false,
                "read": false,
                "destroy": false
            },
            "/cuerpos-academicos/:academic_body_id/editar": {
                "module": "/cuerpos-academicos/:academic_body_id/editar",
                "create": false,
                "edit": false,
                "read": true,
                "destroy": false
            },
            "/cuerpos-academicos/:academic_body_id/evaluaciones": {
                "module": "/cuerpos-academicos/:academic_body_id/evaluaciones",
                "create": false,
                "edit": false,
                "read": false,
                "destroy": false
            },
            "/cuerpos-academicos/:academic_body_id/lgac": {
                "module": "/cuerpos-academicos/:academic_body_id/lgac",
                "create": false,
                "edit": false,
                "read": false,
                "destroy": false
            },
            "/cuerpos-academicos/:academic_body_id/miembros": {
                "module": "/cuerpos-academicos/:academic_body_id/miembros",
                "create": false,
                "edit": false,
                "read": false,
                "destroy": false
            },
            "/cuerpos-academicos/:academic_body_id/redes": {
                "module": "/cuerpos-academicos/:academic_body_id/redes",
                "create": false,
                "edit": false,
                "read": false,
                "destroy": false
            },
            "/cuerpos-academicos/:academic_body_id/colaboradores": {
                "module": "/cuerpos-academicos/:academic_body_id/colaboradores",
                "create": false,
                "edit": false,
                "read": false,
                "destroy": false
            },
            "/sni": {
                "module": "/sni",
                "create": false,
                "edit": false,
                "read": false,
                "destroy": false
            },
            "/prodep": {
                "module": "/prodep",
                "create": false,
                "edit": false,
                "read": false,
                "destroy": false
            },
            "/prodep/nptcs": {
                "module": "/prodep/nptcs",
                "create": false,
                "edit": false,
                "read": false,
                "destroy": false
            },
            "/investigadores": {
                "module": "/investigadores",
                "create": false,
                "edit": false,
                "read": false,
                "destroy": false
            },
        }
    }  as any
});

export const mutations = {
    logout: () => {
        state.user = {
            name: '',
            token: '',
            permissions: {} as any
        }
        sessionStorage.clear();
    },
    updateUser: (user: { name: string, token: string, id: string, permissions: [{ module: string }] }) => {
        state.user = {
            ...user,
            permissions: user.permissions.reduce((previousValue, actual) => {
                return {
                    ...previousValue,
                    [`${actual.module}`]: {
                        ...actual
                    }
                };
            }, {})
        };
        sessionStorage.setItem('token', `Bearer ${state.user.token}`);
        sessionStorage.setItem('id', state.user.id);
        sessionStorage.setItem('permissions', JSON.stringify(state.user.permissions));
    },
    loadTokenFromStorage: () => {
        const token = sessionStorage.getItem('token');
        const permissions = sessionStorage.getItem('permissions');
        const id = sessionStorage.getItem('id');
        state.user = {
            ...state.user,
            permissions: permissions === null ? state.user.permissions: JSON.parse(permissions),
            token: token === null ? "" : token,
            id: token === null ? "": id
        }
    }
}

mutations.loadTokenFromStorage();

export default state;
