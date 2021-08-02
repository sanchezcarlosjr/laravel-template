<template>
  <div class="vfg-autocomplete">
    <b-form-input
      :id="schema.model"
      v-model="displayValue"
      autocomplete="off"
      :readonly="schema.readonly"
      :required="schema.required"
      debounce="500"
      @keydown="onKeyDown"
      @focus="onFocus"
      @blur="onBlur"
    />
    <div v-if="showOptions" class="vfg-autocomplete-items">
      <div
        v-if="$apollo.loading"
        class="text-center"
      >
        <b-spinner variant="primary"/>
      </div>
      <template v-if="!$apollo.loading">
        <div v-for="(option, index) in filteredOptions"
          v-on:mousedown="onOptionClick($event, option)"
          v-html="option.text"
          v-bind:class="{ 'vfg-autocomplete-active': index === focus }"
        />
        <div
          v-if="filteredOptions.length === 0"
          class="text-center"
        >
          No se han encontrado resultados para tu búsqueda
        </div>
      </template>

    </div>
  </div>
</template>
<script lang="ts" src="./vfg-field-select-graphql-id.ts"></script>
<style lang="scss" scoped>
/** ToDo: overflow: hidden on modal parent hides results in modal */
.vfg-autocomplete {
  position: relative;
}

.vfg-autocomplete-active {
  color: white;
  background-color: var(--primary) !important;
}

.vfg-autocomplete-items {
  border: 1px solid #D4D4D4;
  border-width: 0px 1px;
  position: absolute;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;

  > div {
    padding: 10px;
    background-color: #FFF;
    border-bottom: 1px solid #D4D4D4;
    cursor: pointer;

    &:hover {
      background-color: #E9E9E9;
    }
  }
}


</style>
