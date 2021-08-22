<template>
    <div>
        <card-title-component title="Permisos"></card-title-component>
        <b-table striped hover :items="items" :fields="fields"></b-table>
    </div>
</template>
<script src="./permissions.page.ts" lang="ts"></script>
<style src="./permissions.page.scss" scoped lang="scss"></style>
