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
                                                <apollo-form
                                                    ref="form"
                                                    :resource="resource"
                                                    :schema="schema"
                                                ></apollo-form>
                                                <b-button block class="form-group" size="lg" squared variant="primary"
                                                          @click="login">
                                                    Iniciar sesión
                                                </b-button>
                                            </b-row>
                                            <b-row align-h="center">
                                                <p>
                                                    <router-link to="/inicio">Si desea ingresar como anónimo presione
                                                        aquí.
                                                    </router-link>
                                                </p>
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
