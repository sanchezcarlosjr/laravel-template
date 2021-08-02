import {Component, Mixins} from 'vue-property-decorator';
import VueFormGenerator from "vue-form-generator";

@Component
export default class VfgFieldGraphQLSelect extends Mixins(VueFormGenerator.abstractField) {
  private target!: string;
  private options: { text: string, value: string }[] = [];

  public schema: any;
  public value: [] = [];

  beforeMount() {
    /** Target field to display */
    this.target = this.schema.query.target??this.schema.model.split(".").pop()??"id";
    /** Instantiate Query */
    this.$apollo.addSmartQuery("options", {
      query: this.schema.query.resource.all({
        fields: [
          "id",
          this.target
        ],
        args: this.schema.query.scopes.map((scope: any) => {
          /** Unspecified values are empty Strings */
          scope.value = scope.value??"";
          return scope;
        })
      }),
      update: (data) => {
        return data[this.schema.query.resource.resource.plural].data.map((field: any) => {
          return {
            value: field.id,
            text: field[this.target]
          };
        });
      },
      fetchPolicy: "no-cache"
    });
  }

  mounted() {
      this.value = [];
  }

}
