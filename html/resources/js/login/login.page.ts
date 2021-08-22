import Vue from "vue"
import Component from "vue-class-component"
import gql from "graphql-tag";
import router from "../routes";
import {mutations} from "../store/store";

@Component
export default class LoginPage extends Vue {
    form = {
        email: '',
        password: '',
        loading: false
    };
    year = new Date().getFullYear();
    passwordStatus = 0;
    password = {
        0: {
            icon: 'eye',
            type: 'password'
        },
        1: {
            icon: 'eye-slash',
            type: 'text'
        }
    };

    changePasswordStatus() {
        this.passwordStatus = this.passwordStatus == 0 ? 1 : 0;
    }

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
        this.form.loading = true;
        try {
            const response = await this.$apollo.query({
                query: gql`
                    query authentication ($email: String!, $password: String!){
                        login(email: $email, password: $password) {
                            current_access_token
                            permissions {
                                module
                                create
                                edit
                                read
                                destroy
                            }
                            employee {
                                name
                            }
                        }
                    }
                `,
                variables: {
                    email: this.form.email+"@uabc.edu.mx",
                    password: this.form.password
                }
            });
            mutations.updateUser({
                name: response.data.login.employee.name,
                token: response.data.login.current_access_token,
                permissions: response.data.login.permissions
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
        } catch (e) {
            console.log(e)
            this.$bvToast.toast(`Compruebe los datos.`, {
                title: 'Problemas al iniciar sesión.',
                variant: 'danger',
                solid: true
            });
        } finally {
            this.form.loading = false;
        }
    }

}

