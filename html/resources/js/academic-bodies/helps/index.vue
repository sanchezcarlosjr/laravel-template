<template>
  <siip-table
    :resource="resource"
    :fields="fields"
    :filter="criteria"
    :crudSchema="formSchemas"
  />
</template>

<script src="./helps.page.ts" lang="ts"></script>
