import Component from "vue-class-component";
import {Mixins} from 'vue-property-decorator';

const VueFormGenerator = require('vue-form-generator');

@Component
export default class VfgFieldCalendar extends Mixins(VueFormGenerator.abstractField) {
    mounted() {
        // @ts-ignore
        if (this.schema.default !== undefined) {
            // @ts-ignore
            this.value = this.schema.default;
        }
    }
}
