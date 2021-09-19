<template>
  <b-modal
    ref="modal"
    :id="schema.getID()"
    :title="schema.getTitle()"
    :size="schema.size"
    :static="true"
    :hide-footer="schema.hideFooter"
    :busy="busy"
    cancel-title="Cancelar"
    :ok-title="schema.okTitle"
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
