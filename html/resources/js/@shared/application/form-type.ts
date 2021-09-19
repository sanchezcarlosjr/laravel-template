import {DocumentNode} from "graphql";
import GraphQLResourceRepository from "@shared/infraestructure/GraphQLResourceRepository";
import {FormSchema} from "@shared/application/form-schema";
import VueFormGenerator from "vue-form-generator";

export enum FormType {
    Create = "create",
    Read = "read",
    Update = "edit",
    Destroy = "destroy",
    Archive = "archive"
}

export abstract class Mutation {
    abstract mutate(resource: GraphQLResourceRepository, model: any): { mutation: DocumentNode, variables: any };
}

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

export class LoginMutation extends Mutation {
    mutate(resource: GraphQLResourceRepository, model: { email: string, password: string }): { mutation: DocumentNode; variables: any } {
        return {
            mutation: resource.get({
                fields: [
                    'id',
                    'current_access_token',
                    'permissions.module',
                    'permissions.create',
                    'permissions.edit',
                    'permissions.read',
                    'permissions.destroy',
                    'employee.name'
                ],
                args: [
                    {
                        name: "email",
                        value: "$email"
                    },
                    {
                        name: "password",
                        value: "$password"
                    }
                ],
                vars: [{
                    name: "$email",
                    type: "String!"
                }, {
                    name: "$password",
                    type: "String!"
                }]
            }),
            variables: {
                ...model
            }
        }
    }
}

export class Login extends Form {
    constructor() {
        super(new LoginMutation());
    }

    static instance(schema: FormSchema) {
        const login = new Login();
        login.schema = schema;
        return login;
    }
}

export class UpsertMutation extends Mutation {
    mutate(resource: GraphQLResourceRepository, model: any): { mutation: DocumentNode; variables: any } {
        return {
            mutation: resource.upsert(),
            variables: {
                data: {
                    ...model
                }
            }
        }
    }
}

export class DestroyerMutation extends Mutation {
    mutate(resource: GraphQLResourceRepository, model: { id: string | number }): { mutation: DocumentNode; variables: any } {
        return {
            mutation: resource.destroy(),
            variables: {
                id: model.id
            }
        };
    }
}

export class ReaderMutation extends Mutation {
    mutate(resource: GraphQLResourceRepository, model: any): { mutation: DocumentNode; variables: any } {
        return {mutation: resource.all(), variables: {}};
    }
}

export abstract class FormModalSchemaBuilder extends Form {
    private readonly defaultSize = "md";

    protected constructor(mutation: Mutation, private userInterfaceAttributes: {
        id: FormType | string,
        okTitle: string,
        prefixTitle: string,
        icon: string
    }, private _hideFooter: boolean = false) {
        super(mutation);
    }

    get okTitle(): string {
        return this.userInterfaceAttributes.okTitle;
    }

    get hideFooter(): boolean {
        return this._hideFooter;
    }

    get ref() {
        return this.getID();
    }

    get size() {
        return this._schema.size ?? this.defaultSize;
    }

    getID(): FormType | string {
        return this.userInterfaceAttributes.id;
    }

    getContextualOption() {
        return {
            click: this.getID(),
            name: `<a>
                    <i class="fas fa-${this.userInterfaceAttributes.icon}"></i>
                        ${this.getTitle()}
                  </a>`
        }
    }

    setLegend(legend: string) {
        this._schema.legend = legend;
    }

    getTitle(legend?: string) {
        return `${this.userInterfaceAttributes.prefixTitle} ${this._schema.legend}`;
    }

}


export class ResourceCreatorModalForm extends FormModalSchemaBuilder {
    constructor(prefixTitle = "Crear", okTitle = "Añadir", id = FormType.Create) {
        super(new UpsertMutation(), {
            id,
            prefixTitle: prefixTitle,
            okTitle: okTitle,
            icon: 'plus-square'
        });
    }
}

export class ResourceUpdaterModalForm extends FormModalSchemaBuilder {
    constructor(prefixTitle = "Actualizar", okTitle = "Actualizar", id: string = FormType.Update) {
        super(new UpsertMutation(), {
            id,
            prefixTitle,
            okTitle,
            icon: 'edit'
        });
    }

    static instance(attributes?: { prefixTitle: string, okTitle: string, id: string, schema: FormSchema }) {
        if (!attributes) {
            return new ResourceUpdaterModalForm();
        }
        const resourceUpdaterModalForm = new ResourceUpdaterModalForm(
            attributes.prefixTitle, attributes.okTitle, <FormType>attributes.id);
        resourceUpdaterModalForm.schema = attributes.schema;
        return resourceUpdaterModalForm;
    }
}

export class ResourceReaderFormModal extends FormModalSchemaBuilder {
    constructor(prefixTitle = "Detalles de") {
        super(new ReaderMutation(), {
            id: FormType.Read,
            prefixTitle: prefixTitle,
            okTitle: "",
            icon: 'info-circle'
        }, true);
    }
}

export class ResourceDestroyerFormModal extends FormModalSchemaBuilder {
    constructor(prefixTitle = "Eliminar", okTitle = "Eliminar", id = FormType.Destroy) {
        super(new DestroyerMutation(), {
            id,
            prefixTitle: prefixTitle,
            okTitle: okTitle,
            icon: 'trash'
        });
    }
}
