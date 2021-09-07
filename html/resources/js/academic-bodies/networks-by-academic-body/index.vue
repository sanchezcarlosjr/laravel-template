<template>
    <siip-table
        :crudSchema="formSchemas"
        :fields="fields"
        :resource="apiResource"
    ></siip-table>
</template>

<script src="./networks.page.ts" lang="ts"></script>
<style src="./networks.page.scss" scoped lang="scss"></style>
