<template>
    <div class="p-2">
        <apollo-form
            ref="form"
            :resource="resource"
            :schema="formSchemas.updater|| formSchemas.reader"
        />
        <b-button
            v-if="formSchemas.canBeUpdate"
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
