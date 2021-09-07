<template>
  <siip-table
    :resource="resource"
    :fields="fields"
    :filter="criteria"
    :crudSchema="formSchemas"
  />
</template>

<script src="./evaluations.page.ts" lang="ts" />
