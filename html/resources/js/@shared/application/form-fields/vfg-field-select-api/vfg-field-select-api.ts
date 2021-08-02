import axios from 'axios';
import Component from "vue-class-component";
import {Mixins} from 'vue-property-decorator';

const VueFormGenerator = require('vue-form-generator');

@Component
export default class VfgFieldApiSelect extends Mixins(VueFormGenerator.abstractField) {
    [x: string]: any;

    options: { text: string, value: string }[] = [];

    mounted() {
        axios.get(this.schema.api).then((response) =>
            response.data.forEach((element: any) => {
                this.options.push({
                    value: element['id'],
                    text: element[this.schema.textKey]
                })
            })
        )
    }

}
