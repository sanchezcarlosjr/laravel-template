<template>
   <div>
       <b-form-checkbox
           v-if="!schema.readonly"
           size="lg"
           v-model="value"
           switch>
           {{ value ? schema.textOn : schema.textOff }}
       </b-form-checkbox>
       <p v-if="schema.readonly" class="p-0 m-0">{{ value ? schema.textOn : schema.textOff }}</p>
   </div>
</template>
<script src="./vfg-field-switch.ts" lang="ts"></script>
<style src="./vfg-field-switch.scss" scoped lang="scss"></style>
