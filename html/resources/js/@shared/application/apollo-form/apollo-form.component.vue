<template>
    <b-overlay :show="busy" rounded="sm" style="width: 100%">
        <vue-form-generator
          ref="form"
          :schema="schema.schema"
          :model="model"
        />
    </b-overlay>
</template>

<script src="./apollo-form.ts" lang="ts"></script>
