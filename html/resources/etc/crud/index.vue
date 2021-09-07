<template>
    <siip-table
        :resource="resource"
        :fields="fields"
        :filter="criteria"
        :crudSchema="formSchemas"
    />
</template>

<script src="./example.ts" lang="ts"></script>
<style src="./example.scss" scoped lang="scss"></style>
