<template>
    <div>
        <b-form-input
            :readonly="schema.readonly"
            :id="schema.model"
            :list="schema.model.concat('select')"
            v-model="text"
            debounce="200"
            :state="idState"
            trim
            @blur="handleBlur"
        ></b-form-input>
        <datalist :id="schema.model.concat('select')">
            <option v-for="option in options"
                    :id="schema.model.concat('select')+option.text"
                    :data-value="option.value"
                    :value="option.text"></option>
        </datalist>
    </div>
</template>
<script lang="ts" src="./vfg-field-select-graphql.ts"></script>
<style lang="scss" scoped src="./vfg-field-select-graphql.scss"></style>
