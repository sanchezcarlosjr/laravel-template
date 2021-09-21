<template>
    <b-input-group append="@uabc.edu.mx">
                    <b-form-input
                        :readonly="schema.readonly"
                        v-model="userName"
                        type="email"
                        size="lg"
                        placeholder="Ingresa usuario uabc"
                    ></b-form-input>
    </b-input-group>
</template>
<script src="./vfg-field-email.ts" lang="ts"></script>
<style src="./vfg-field-email.scss" scoped lang="scss"></style>
