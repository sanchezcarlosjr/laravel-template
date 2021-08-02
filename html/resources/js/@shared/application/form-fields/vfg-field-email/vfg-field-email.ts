import Component from "vue-class-component";
import {Mixins} from 'vue-property-decorator';

const VueFormGenerator = require('vue-form-generator');

@Component
export default class VfgFieldEmail extends Mixins(VueFormGenerator.abstractField) {
    [x: string]: any;

    userName = '';

    mounted() {
        if (this.value == null) {
            return;
        }
        this.userName = this.value.split('@')[0];
    }
    updated() {
        this.value = `${this.userName}@uabc.edu.mx`
    }
}
