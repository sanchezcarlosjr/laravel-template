<template>
  <siip-table
      :resource="resource"
      :fields="fields"
      :filter="criteria"
      :crudSchema="formSchemas"
      :links="links"
      @created-element="createdElement"
  >
    <template #statistics="slotProps">
      <academic-body-statistics :filters="slotProps.filters"/>
    </template>
  </siip-table>
</template>

<script lang="ts" src="./academic-body-management.page.ts"></script>
