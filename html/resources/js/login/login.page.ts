import Vue from "vue"
import Component from "vue-class-component"
import {Form, Login} from "@shared/application/form-type";
import {users} from "@shared/repositories/users/repository";
import {Ref} from "vue-property-decorator";
import GraphQLResourceRepository from "@shared/infraestructure/GraphQLResourceRepository";
import {mutations} from "../store/store";
import router from "../routes";

@Component
export default class LoginPage extends Vue {
    year = new Date().getFullYear();
    @Ref() form!: Vue & {
        submit: () => any ;
        reset: () => void;
        get: (id: number) => void;
        validate: () => boolean;
        busy: boolean;
    }

    schema: Form = Login.instance({
        fields: [
            {
                type: 'email',
                label: 'Correo electrónico',
                model: 'email'
            },
            {
                type: 'password',
                label: 'Contraseña',
                model: 'password'
            }
        ]
    });
    resource = new GraphQLResourceRepository({
        singular: 'login',
        plural: ''
    });

    mounted() {
        if (this.$route.query.redirectTo) {
            this.$bvToast.toast(`Sin permisos para ejecutar la operación solicitada.`, {
                title: 'Inicie sesión para continuar.',
                variant: 'danger',
                solid: true
            });
        }
    }

    async login() {
        const response = await this.form.submit();
        if (response === undefined) {
            return;
        }
        mutations.updateUser({
            name: response.data.login.employee.name,
            token: response.data.login.current_access_token,
            permissions: response.data.login.permissions,
            id: response.data.login.id
        });
        if (this.$route.query.redirectTo === undefined) {
            await router.push({name: 'Inicio'});
        } else {
            await router.push(this.$route.query.redirectTo as string);
        }

        this.$bvToast.toast(`Bienvenido ${response.data.login.employee.name}`, {
            title: 'Operación exitosa',
            variant: 'success',
            solid: true
        });
    }

}

