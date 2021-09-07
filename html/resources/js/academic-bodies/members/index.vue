<template>
  <siip-table
    :resource="resource"
    :fields="fields"
    :filter="criteria"
    :crudSchema="formSchemas"
    :rowClass="rowClass"
  />
</template>

<script src="./members.page.ts" lang="ts"></script>
