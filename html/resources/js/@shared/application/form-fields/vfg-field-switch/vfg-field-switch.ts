import Component from "vue-class-component";
import {Mixins} from 'vue-property-decorator';

const VueFormGenerator = require('vue-form-generator');

@Component
export default class VfgFieldSwitch extends Mixins(VueFormGenerator.abstractField) {
    mounted() {
        // @ts-ignore
        if (typeof this.value === 'undefined' || this.value === null || this.value === '') {
            // @ts-ignore
            this.value = false;
        }
    }
}
