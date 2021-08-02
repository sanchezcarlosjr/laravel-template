<template>
  <b-modal
    ref="modal"
    :id="_id"
    :title="_title"
    :size="modalSize"
    :static="true"
    :hide-footer="isTypeRead()"
    :busy="busy"
    cancel-title="Cancelar"
    :ok-title="_okTitle"
    @ok="onOk"
    scrollable
    @hide="onHide"
  >
    <apollo-form
      ref="form"
      :schema="schema"
      :resource="resource"
    />
  </b-modal>
</template>

<script src="./form-modal.component.ts" lang="ts"></script>
