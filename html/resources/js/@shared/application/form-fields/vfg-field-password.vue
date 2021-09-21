<template>
    <b-input-group class="mt-3">
        <template #append>
            <b-input-group-text @click="changePasswordStatus">
                <font-awesome-icon
                    :icon="password[passwordStatus].icon"
                    class="text-muted"></font-awesome-icon>
            </b-input-group-text>
        </template>
        <b-form-input
            id="password"
            v-model="value"
            :type="password[passwordStatus].type"
            required
            autocomplete="current-password"
            size="lg"
        ></b-form-input>
    </b-input-group>
</template>


<script lang="ts">
import Component from "vue-class-component";
import {Mixins} from "vue-property-decorator";
const VueFormGenerator = require('vue-form-generator');

@Component
export default class VfgFieldPassword extends Mixins(VueFormGenerator.abstractField) {
    passwordStatus = 0;
    password = {
        0: {
            icon: 'eye',
            type: 'password'
        },
        1: {
            icon: 'eye-slash',
            type: 'text'
        }
    };
    changePasswordStatus() {
        this.passwordStatus = this.passwordStatus == 0 ? 1 : 0;
    }
}
</script>

<style scoped>

</style>
