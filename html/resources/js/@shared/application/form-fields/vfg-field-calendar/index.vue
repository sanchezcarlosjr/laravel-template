<template>
   <b-form-datepicker
      block
      :readonly="schema.readonly"
      v-model="value"
    ></b-form-datepicker>
</template>
<script src="./vfg-field-calendar.ts" lang="ts"></script>
<style src="./vfg-field-calendar.scss" scoped lang="scss"></style>
