<template>
    <siip-table
        :resource="resource"
        :fields="fields"
        :filter="criteria"
        :crudSchema="formSchemas"
    />
</template>
<script src="./users.page.ts" lang="ts"></script>
<style src="./users.page.scss" scoped lang="scss"></style>
