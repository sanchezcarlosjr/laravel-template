<template>
    <div class="wrapper">
        <div class="main-panel">
            <div class="content">
                <div class="page-inner">
                    <div class="row">
                        <div class="col-md-12" style="display: flex;align-items: center; justify-content: center;">
                            <div class="card" style="width: 60%; border: 0; padding: 50px">
                                <div class="container">
                                    <div class="card-header">
                                        <b-container class="card-title">
                                            <b-row align-h="center">
                                                <b-col style="display: contents">
                                                    <b-img alt="Banner UABC" fluid
                                                           src="/img/banner.png"></b-img>
                                                </b-col>
                                            </b-row>
                                            <b-row align-h="center" style="margin: 0;">
                                                <b-overlay :show="form.loading" rounded="sm" style="width: 100%">
                                                    <b-form style="width: 100%" @submit.prevent="login">
                                                        <b-form-group
                                                            id="input-group-1"
                                                            label="Correo electrónico"
                                                            label-for="input-1"
                                                            style="padding: 10px 0;"
                                                        >
                                                            <b-input-group size="lg" append="@uabc.edu.mx">
                                                                <b-form-input
                                                                    id="user"
                                                                    required
                                                                    size="lg"
                                                                    autocomplete="current-email"
                                                                    v-model="form.email"
                                                                ></b-form-input>
                                                            </b-input-group>

                                                        </b-form-group>
                                                        <b-form-group
                                                            id="input-group-2"
                                                            label="Contraseña"
                                                            label-for="contraseña-1"
                                                            style="padding: 10px 0;"
                                                        >
                                                            <b-input-group class="mt-3">
                                                                <template #append>
                                                                    <b-input-group-text @click="changePasswordStatus">
                                                                        <font-awesome-icon
                                                                            :icon="password[passwordStatus].icon"
                                                                            class="text-muted"></font-awesome-icon>
                                                                    </b-input-group-text>
                                                                </template>
                                                                <b-form-input
                                                                    id="password"
                                                                    v-model="form.password"
                                                                    :type="password[passwordStatus].type"
                                                                    required
                                                                    autocomplete="current-password"
                                                                    size="lg"
                                                                ></b-form-input>
                                                            </b-input-group>

                                                        </b-form-group>
                                                        <b-button block size="lg" squared type="submit" variant="primary">
                                                            Iniciar sesión
                                                        </b-button>
                                                    </b-form>
                                                </b-overlay>
                                            </b-row>
                                        </b-container>
                                    </div>
                                </div>
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
<script lang="ts" src="./login.page.ts"></script>
<style lang="scss" scoped src="./login.page.scss"></style>
