import {Component, Mixins, Watch} from 'vue-property-decorator';
import VueFormGenerator from "vue-form-generator";
import {FormField} from "@shared/application/form-schema";

export function validator({
  selectValid = "Seleccione un recurso valido"
}:{
  selectValid?: string
} = {}) {
  return (value: any, schema: any, model: any)=>{
    let errors: string[] = [];
    if (schema.required) {
      if (schema.query.selectedOption === undefined) {
        errors.push("Este campo es obligatorio");
        return errors;
      }
      if (schema.query.selectedOption.text !== schema.query.displayValue) {
        errors.push(selectValid);
      }
    }
    return errors;
  }
}

@Component
export default class VfgFieldGraphQLIdSelect extends Mixins(VueFormGenerator.abstractField) {
  private showOptions: boolean = false;
  private reference!: string;
  private target!: string;
  private options: any[] = [];
  private selectedOption: any;
  private _hint: string = "";
  private displayValue: string = "";
  private focus: number = -1;

  public value: string = "";
  public schema: FormField | any;
  public model!: any;

  beforeMount() {
    /** Target field to display */
    this.target = this.schema.query.target??this.schema.model.split(".").pop()??"id";
    /** Reference for Mutation appendage */
    this.reference = this.schema.query.ref??`${this.schema.query.resource.resource.singular}_id`;
    /** Instantiate Query */
    this.$apollo.addSmartQuery("options", {
      query: this.schema.query.resource.all({
        fields: [
          "id",
          this.target
        ],
        args: this.schema.query.scopes.map((scope: any) => {
          /** Unspecified values are String input */
          scope.value = scope.value??"$input";
          return scope;
        }),
        vars: [{
          name: "$input",
          type: "String"
        }]
      }),
      update: (data) => {
        return data[this.schema.query.resource.resource.plural].data.map((field: any) => {
          return {
            value: field.id,
            text: field[this.target]
          };
        });
      },
      variables: {
        /** GraphQL takes "" as null for some reason */
        input: "%"
      },
      fetchPolicy: "no-cache"
    });

    /** Wait for ApolloForm to bring data back */
    //this.$apollo.queries.options.skip = true;

    this.$watch("value", (value: string)=> {
      this.displayValue = value??this.selectedOption?.text??"";
    });

    this.$watch("displayValue", (input: string) => {
      if (this.selectedOption?.text !== input) {
        this.search(input);
      }
    });

    this._hint = this.schema.hint;

    /** Default default function lol */
    if (this.schema.default === undefined) {
      this.schema.default = ()=>{
        this.schema.hint = this._hint;
        this.schema.query.selectedOption = this.selectedOption = undefined;
        this.schema.query.displayValue = this.displayValue = "";
        this.resetAutoComplete();
      }
    }
  }

  @Watch("options")
  onOptionsChange() {
    /** When the options are updated, attempt to find matching target and select it */
    let option = this.options.find((o: any) => {
      return o.value == this.displayValue || o.text == this.displayValue;
    });
    if (option !== undefined) {
      this.selectOption(option);
    }
  }

  private search(input: string) {
    this.$apollo.queries.options.refetch({
      input: input !== ""?input:"%"
    });
  }

  private selectOption(option: any) {
    this.selectedOption = option;
    /** Set visual */
    this.displayValue = option.text;
    /** Hint updates if set; not reactive otherwise */
    if (this.schema.hint !== undefined) {
      this.schema.hint = this._hint + option.value;
    }
    this.setReferenceModel();
  }

  private onFocus() {
    this.showOptions = true;
  }

  private onBlur() {
    this.resetAutoComplete();
  }

  private resetAutoComplete() {
    this.focus = -1;
    this.showOptions = false;
  }

  private onKeyDown(e: KeyboardEvent) {
    if (e.keyCode === 13) {
      /** Enter */
      e.preventDefault();
      if (this.focus > -1) {
        this.selectOptionWithFiltered(
          this.filteredOptions[this.focus]
        );
        this.resetAutoComplete();
      }
      return;
    }
    this.showOptions = true;
    if (e.keyCode === 40 || e.keyCode === 38) {
      if (e.keyCode === 40) {
        /** Down*/
        this.focus++;
      } else if (e.keyCode === 38) {
        /** Up */
        this.focus--;
      }
      /** Loop */
      let optionsLength = this.filteredOptions.length;
      if (this.focus > optionsLength - 1) {
        this.focus = 0;
      } else if (this.focus < 0) {
        this.focus = optionsLength - 1;
      }
    }
  }

  private selectOptionWithFiltered(dirtyOption: any) {
    let cleanOption = this.options.find(option => option.value == dirtyOption.value);
    if (cleanOption !== undefined) {
      this.selectOption(cleanOption);
    }
  }

  private onOptionClick(e: MouseEvent, dirtyOption: any) {
    this.selectOptionWithFiltered(dirtyOption);
  }

  private setReferenceModel() {
    if (this.selectedOption === undefined) {
      return;
    }
    /** Add reference to model */
    this.model[this.reference] = this.selectedOption.value;

    let name = this.schema.model.split(".").shift();
    while(name in this.model) {
      /** Delete visual fetch from model */
      delete(this.model[name]);
    }

    this.schema.query.selectedOption = this.selectedOption;
    this.schema.query.displayValue = this.displayValue;
  }

  get filteredOptions() {
    let regex = new RegExp(this.displayValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "ig");

    return this.options.filter((option) => {
      return option.text.match(regex) !== null || option.value.includes(this.displayValue);
    }).map((option) => {
      let o = Object.assign({}, option);
      o.text = o.text.replace(
        regex,
        `<strong>${this.displayValue}</strong>`
      );
      return o;
    });
  }
}
