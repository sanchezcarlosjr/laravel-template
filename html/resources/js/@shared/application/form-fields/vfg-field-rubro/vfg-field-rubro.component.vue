<template>
  <b-table
    :fields="fields"
    :items="items"
    head-variant="light"
    hover
    responsive
    show-empty
    small
    stacked="md"
    sticky-header
    striped
    foot-clone
  >
    <template #cell(name)="data">
      {{data.value}}
    </template>
    <template #cell(authorized)="data">
      <b-form-checkbox/>
    </template>
    <template #cell(amount)="data">
      <b-form-input v-model="items[data.index].amount" type="number" />
    </template>
    <template #foot(name)="data">
      {{""}}
    </template>
    <template #foot(amount)="data">
      {{ total }}
    </template>
    <template #foot(authorized)="data">
      Subtotal
    </template>
  </b-table>
</template>

<script src="./vfg-field-rubro.ts" lang="ts"></script>
