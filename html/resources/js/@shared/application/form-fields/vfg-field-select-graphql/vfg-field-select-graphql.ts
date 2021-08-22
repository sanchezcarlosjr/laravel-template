import {Component, Mixins} from 'vue-property-decorator';
import {adapt} from "../../../infraestructure/communication/graphql/graphql-adapter";
import {OptionsApolloRepository} from "./OptionsApolloRepository";
import {GraphqlResourceRepository} from "../../../infraestructure/communication/graphql/graphql-resource-repository";
import gql from "graphql-tag";

const VueFormGenerator = require('vue-form-generator');

@Component({
    apollo: {
        text: {
            query() {
                return gql`query getResourceById($id: ID) {
                    ${this.schema.find}(id: $id) {
                        ${this.schema.textKey}
                    }
                }`
            },
            manual: true,
            result({data, loading}) {
                if (!loading && this.value) {
                    this.text = data[this.schema.find][this.schema.textKey];
                }
            },
            variables(): any {
                return {
                    id: this.value
                }
            },
        },
        options: adapt(new OptionsApolloRepository()),
    }
})
export default class VfgFieldGraphQLSelect extends Mixins(VueFormGenerator.abstractField) {
    [x: string]: any;

    options: { text: string, value: string }[] = [];
    optionsFinder = typeof this.schema.query === 'string' ? GraphqlResourceRepository.createDefaultRepository(this.schema.query) : this.schema.query;
    isTouched: any = null;
    text = '';

    mounted() {
        if (this.value) {
            this.$apollo.queries.text.start();
        }
    }

    get idState() {
        return this.isTouched;
    }

    handleBlur() {
        const element = document.getElementById(this.schema.model.concat('select') + this.text)

        // @ts-ignore
        this.value = element.getAttribute('data-value');
        this.isTouched = true;
    }

}
