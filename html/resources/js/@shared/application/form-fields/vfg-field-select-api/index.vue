<template>
    <b-form-select
        :readonly="schema.readonly"
        v-model="value"
        :options="options">
    </b-form-select>
</template>
<script src="./vfg-field-select-api.ts" lang="ts"></script>
<style src="./vfg-field-select-api.scss" scoped lang="scss"></style>
