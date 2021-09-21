<template>
    <form-modal
        :resource="resource"
        :schema="formSchema"
    />
</template>


<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import FormModal from "@shared/application/form-modal/form-modal.component.vue";
import {users} from "@shared/repositories/users/repository";
import {userIdInjector} from "@shared/application/injector/user-id-injector";
import {FormModalSchemaBuilder} from "@shared/application/form/form-modal-schema-builder";
import {ResourceUpdaterModalForm} from "@shared/application/form/resource-updater-modal-form";

@Component({
    components: {
        FormModal
    }
})
export default class ChangePasswordComponent extends Vue {
    id = "change-password";
    private resource = users;
    private formSchema: FormModalSchemaBuilder = ResourceUpdaterModalForm.instance({
        prefixTitle: "Cambiar ",
        okTitle: "Cambiar",
        id: this.id,
        schema: {
            legend: "contraseña",
            inject: [userIdInjector],
            fields: [
                {
                    type: 'password',
                    label: 'Nueva contraseña',
                    model: "contrasena"
                }
            ]
        }
    });
}
</script>
