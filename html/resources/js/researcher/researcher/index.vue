<template>
    <siip-table
        :fields="fields"
        :resource="apiResource"
        :schema="schema"
        :spanishResourceName="spanishResourceName"

        :toolbar="toolbar"

    ></siip-table>
</template>

<script lang="ts" src="./researcher.page.ts"></script>
<style lang="scss" scoped src="./researcher.page.scss"></style>
