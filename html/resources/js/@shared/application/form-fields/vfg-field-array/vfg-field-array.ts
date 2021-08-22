import {Component, Mixins} from 'vue-property-decorator';

const VueFormGenerator = require('vue-form-generator');

@Component
export default class VfgFieldArray extends Mixins(VueFormGenerator.abstractField) {

    createField() {
        // @ts-ignore
        this.value.push({});
    }

    updated() {

        // @ts-ignore
        if (this.value === undefined || this.value.length === 0) {
            // @ts-ignore
            this.value = [{}];
        }
    }

    remove(index: number) {
        // @ts-ignore
        this.value.splice(index, 1);
    }
}
