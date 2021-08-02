<template>
    <b-container>
        <b-row class="text-center">
            <b-col>
                <b-tabs v-model="tabIndex" content-class="mt-3">
                    <b-tab title="Gráfica" active lazy>
                        <bar-chart :chart-data="sniByLevelData" :options="sniByLevelOptions"></bar-chart>
                    </b-tab>
                    <b-tab title="Tabla" lazy>
                        <sni-statistics-table :busy="$apollo.loading" :fields="fields" :items="items"/>
                    </b-tab>
                </b-tabs>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts" src="./statistics.page.ts"></script>
<style lang="scss" scoped src="./statistics.page.scss"></style>
