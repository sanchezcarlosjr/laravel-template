<template>
    <div class="wrapper">
        <change-password-component></change-password-component>
        <div class="main-header" data-background-color="green">
            <div class="logo-header" data-background-color="green">
                <router-link class="logo" to="/inicio">SIIIP</router-link>
                <div class="nav-toggle">
                    <button class="btn btn-toggle toggle-sidebar" @click="changeStatusSidebar">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </div>
            <nav class="navbar navbar-header navbar-expand-lg" data-background-color="green">
                <div class="container-fluid">
                    <div>
                        <siip-breadcrumb></siip-breadcrumb>
                    </div>
                    <b-dropdown v-if="isAuthenticated" no-caret variant="link">
                        <template #button-content>
                            <b-avatar></b-avatar>
                        </template>
                        <b-dropdown-item @click="changePassword">Cambiar contraseña</b-dropdown-item>
                        <b-dropdown-item @click="logout">Salir</b-dropdown-item>
                    </b-dropdown>
                    <router-link v-else :to="{name: 'login'}" tag="b-button">Iniciar sesión</router-link>
                </div>
            </nav>
        </div>
        <div class="sidebar sidebar-style-2" v-bind:style="{ display: displaySidebar }">
            <div class="sidebar-wrapper scrollbar scrollbar-inner">
                <div class="sidebar-content">
                    <div class="user">
                        <b-img alt="UABC LOGO" fluid src="/img/logo.png"></b-img>
                    </div>
                    <ul class="nav nav-primary">
                        <router-link
                            v-for="(route, index) in routes"
                            v-if="route.name && permissions[route.path] !== undefined"
                            :key="index"
                            :to="route.path"
                            active-class="active"
                            class="nav-item"
                            tag="li">
                            <a v-b-toggle="'accordion-' + index">
                                <i
                                    :class="`fa ${route.icon}`"
                                    active-class="text-light"
                                    class="mr-2"
                                    style="font-size: 20px;"></i>
                                <p>{{ route.name }}</p>
                                <span v-if="route.children" class="caret"></span>
                            </a>
                            <b-collapse
                                v-if="route.children"
                                :id="'accordion-'+index"
                                accordion="my-accordion"
                                class="mt-2"
                                role="tabpanel">
                                <router-link
                                    v-for="(subRoute, i) in route.children"
                                    v-if="!subRoute.path.match(':') && (permissions[route.path+'/'+subRoute.path] !== undefined || subRoute.path === '')"
                                    :key="i"
                                    :to="route.path+'/'+subRoute.path"
                                    exact-active-class="active"
                                    tag="li">
                                    <a>
                                        <span class="sub-item">{{ subRoute.name }}</span>
                                    </a>
                                </router-link>
                            </b-collapse>
                            <b-collapse
                                v-if="!route.children"
                                :id="'accordion-'+index"
                                accordion="my-accordion"
                                class="mt-2"
                                role="tabpanel"
                                style="display: none;">
                            </b-collapse>
                        </router-link>
                    </ul>
                </div>
            </div>
        </div>
        <div class="main-panel" v-bind:style="{ width: displayWidth }">
            <div class="content">
                <div class="page-inner">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card" style="border: 0">
                                <router-view :key="$route.path"></router-view>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="footer">
                <div class="container-fluid">
                    <div class="copyright ml-auto">
                        <a href="http://cimarron.uabc.mx/index.html" target="_blank">© UABC Coordinación General de
                            Investigación y Posgrado {{ year }}. Todos los Derechos Reservados.</a>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import router, {routes} from "./routes";
import state, {mutations} from "./store/store";
import ChangePasswordComponent from "./change-password.vue";

@Component({
    components: {
        ChangePasswordComponent
    }
})
export default class ShellComponent extends Vue {
    year = new Date().getFullYear();
    routes = routes[1].children;
    sidebar = true;

    get displaySidebar() {
        return this.sidebar ? 'block' : 'none';
    }

    get displayWidth() {
        return this.sidebar ? 'calc(100% - 250px)' : '100%';
    }

    get permissions() {
        return state.user.permissions;
    }

    get isAuthenticated() {
        return !!state.user.token;
    }

    mounted() {
        this.sidebar = JSON.parse(localStorage.getItem('sidebar') ?? "true");
    }

    changeStatusSidebar() {
        this.sidebar = !this.sidebar;
        localStorage.setItem('sidebar', String(this.sidebar));
    }

    changePassword() {
        this.$root.$emit('bv::show::modal', 'abc');
    }

    logout() {
        mutations.logout();
        router.push({name: 'login'});
    }
}
</script>

<style scoped>
.user {
    display: flex;
    align-items: center;
    justify-content: center;
}

.breadcrumb {
    background-color: transparent;
    padding: 0;
    margin: 0;
    font-size: 14px;
}

.breadcrumb >>> a {
    color: var(--light);
}

.breadcrumb >>> span {
    color: var(--light);
    opacity: 0.7;
    font-size: 14px;
}

.breadcrumb >>> .breadcrumb-item + .breadcrumb-item::before {
    color: var(--light);
    opacity: 0.7;
    font-size: 14px;
}
</style>
