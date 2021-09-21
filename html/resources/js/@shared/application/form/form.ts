import {Mutation} from "@shared/application/form/mutation";
import {FormSchema} from "@shared/application/form/form-schema";
import VueFormGenerator from "vue-form-generator";
import GraphQLResourceRepository from "@shared/infraestructure/GraphQLResourceRepository";

export abstract class Form {
    protected constructor(private mutation: Mutation) {
    }

    private _fields: string[] = [];

    get fields() {
        return this._fields;
    }

    protected _schema: FormSchema = {legend: "", fields: []};

    get schema() {
        return this._schema;
    }

    set schema(formSchema: FormSchema | undefined) {
        if (formSchema) {
            this._schema = formSchema;
            this._fields = this._schema.fields.map(field => {
                if (field.selection) {
                    return field.selection;
                }
                return <string>field.model;
            });
            this._fields.push("id");
        }
    }

    inject(model: any) {
        if (this._schema.inject) {
            this._schema.inject.forEach((injector) => injector(model));
        }
    }

    defaultModel() {
        return VueFormGenerator.schema.createDefaultObject(this._schema);
    }

    mutate(resource: GraphQLResourceRepository, model: any) {
        return this.mutation.mutate(resource, model);
    }

}
