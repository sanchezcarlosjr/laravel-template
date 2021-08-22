<template>
  <div>
    <template v-if="currentState === State.Empty">
      <b-form-file
        ref="file-input"
        v-model="file"
        accept="application/pdf"
        browse-text="Navegar"
        drop-placeholder="Arrasta y suelta aquí..."
        placeholder="Elige un archivo o suelta aquí..."
        @input="onFileChange"
      />
    </template>
    <template v-else>
      <link-button
        :route="route"
        :icon="icon"
      />
    </template>
    <b-button
      v-if="file !== null || currentState === State.Loaded"
      class="text-danger float-right"
      variant="link"
      @click="onRemoveClick"
    >
      Remover
    </b-button>
  </div>
</template>
<script lang="ts" src="./vfg-field-upload.ts"></script>
<style lang="scss" scoped src="./vfg-field-upload.scss"></style>
