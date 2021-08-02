<template>
  <div>
    <div
      v-if="$apollo.loading"
      class="text-center"
    >
      <b-spinner variant="primary"/>
    </div>
    <template v-if="!$apollo.loading">
      <b-form-checkbox-group
        v-if="options.length > 0"
        v-model="value"
        :options="options"
        value-field="value"
        text-field="text"
      ></b-form-checkbox-group>
      <p v-else>No hay {{schema.label}} disponibles.
        <router-link to="lgac?create">Cree una para continuar.</router-link>
      </p>
    </template>
  </div>
</template>
<script lang="ts" src="./vfg-field-tags.ts"></script>
