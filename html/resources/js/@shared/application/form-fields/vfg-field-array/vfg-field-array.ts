import {Component, Mixins} from 'vue-property-decorator';

const VueFormGenerator = require('vue-form-generator');

@Component
export default class VfgFieldArray extends Mixins(VueFormGenerator.abstractField) {
    fields = [{}];
    mounted() {
        this.fields = [{}];
        // @ts-ignore
        this.value = this.fields;
    }
    load() {
        // @ts-ignore
        this.fields = this.value;
    }
    createField() {
        this.fields.push({});
    }
    remove(index: number) {
        this.fields.splice(index,1);
    }
}
