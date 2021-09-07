<template>
    <siip-table
        :resource="resource"
        :fields="fields"
        :crudSchema="formSchemas"
        :filter="criteria"
    >
        <template #statistics="slotProps">
            <sni-statistics :filters="slotProps.filters"/>
        </template>
    </siip-table>
</template>

<script lang="ts" src="./sni.page.ts"></script>
<style lang="scss" scoped src="./sni.page.scss"></style>
