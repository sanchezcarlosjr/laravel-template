<template>
    <form-modal
        :type="formSchema.formType"
        :schema="formSchema"
        :resource="resource"
        @mutate-success="onMutateSuccess"
    />
</template>


<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import FormModal from "@shared/application/form-modal/form-modal.component.vue";
import {FormType} from "@shared/application/form-type";
import {FormSchema} from "@shared/application/form-schema";
import {users} from "@shared/repositories/users/repository";

@Component({
    components: {
        FormModal
    }
})
export default class ChangePasswordComponent extends Vue {
    resource = users;
    formSchema: FormSchema = {
        legend: "contraseña",
        formType: FormType.Update,
        fields: [
            {
                type: 'input',
                inputType: 'text',
                label: 'Nueva contraseña',
                model: "contrasena"
            }
        ]
    };
    onMutateSuccess() {
    }
}
</script>

<style scoped>

</style>
