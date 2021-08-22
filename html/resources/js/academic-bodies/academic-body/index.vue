<template>
    <div class="p-2">
        <apollo-form
            ref="form"
            :resource="resource"
            :schema="formSchemas.edit || formSchemas.read"
        />
        <b-button
            v-if="formSchemas.hasOwnProperty('edit')"
            :disabled="busy"
            class="float-right m-3"
            variant="primary"
            @click="save"
        >
            Guardar cambios
        </b-button>
    </div>
</template>

<script lang="ts" src="./academic-body.page.ts"></script>
