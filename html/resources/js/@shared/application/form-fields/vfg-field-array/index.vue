<template>
    <div>
        <div v-for="(field, index) in value" :key="index">
            <vue-form-generator :schema="schema.schema" :model="field"></vue-form-generator>
        </div>
        <b-button squared variant="outline-secondary" @click="createField">Nuevo</b-button>
    </div>
</template>
<script lang="ts" src="./vfg-field-array.ts"></script>
<style lang="scss" scoped src="./vfg-field-array.scss"></style>
