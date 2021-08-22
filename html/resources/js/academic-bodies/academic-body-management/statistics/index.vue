<template>
    <b-container>
        <b-row class="text-center">
            <b-col>
                <p>Cuerpos Académicos
                    <b-badge>{{ academicBodyStatistics.total }}</b-badge>
                </p>
            </b-col>
            <b-col>
                <p>Profesores con SNI o PRODEP
                    <b-badge>{{ academicBodyStatistics.professorsWithSNIOrProdep }}</b-badge>
                </p>
            </b-col>
            <b-col>
                <p>Profesores en CA
                    <b-badge>{{ academicBodyStatistics.professorsInAcademicBody }}</b-badge>
                </p>
            </b-col>
            <b-col>
                <p>PTC que no están en CA
                    <b-badge>{{ academicBodyStatistics.ptcsAreNotAcademicBody }}</b-badge>
                </p>
            </b-col>
        </b-row>
        <b-row class="text-center">
            <b-col>
                <bar-chart v-if="!$apollo.loading" :chart-data="academicBodyByLevel.data"
                           :options="academicBodyByLevel.options"></bar-chart>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts" src="./statistics.page.ts"></script>
<style lang="scss" scoped src="./statistics.page.scss"></style>
