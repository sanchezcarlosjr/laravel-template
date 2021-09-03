<template>
   <b-form-datepicker
      block
      :readonly="schema.readonly"
      label-calendar="Calendario"
      label-help="Usa los cursores para navegar"
      label-next-month="Siguiente mes"
      v-model="value"
    ></b-form-datepicker>
</template>
<script src="./vfg-field-calendar.ts" lang="ts"></script>
<style src="./vfg-field-calendar.scss" scoped lang="scss"></style>
