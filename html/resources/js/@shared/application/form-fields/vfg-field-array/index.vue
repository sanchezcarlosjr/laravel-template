<template>
    <div>
        <b-button v-if="value && value[0].id" @click="load">Ver todos</b-button>
        <div v-for="(field, index) in fields" :key="index">
            <button v-if="fields.length > 1"  @click="remove(index)" type="button" aria-label="Close" class="close">×</button>
            <vue-form-generator :schema="schema.schema" :model="field"></vue-form-generator>
        </div>
        <b-button squared variant="outline-secondary" @click="createField">Nuevo</b-button>
    </div>
</template>
<script lang="ts" src="./vfg-field-array.ts"></script>
<style lang="scss" scoped src="./vfg-field-array.scss"></style>
