import {FormSchema} from "@shared/application/form-schema";
import {Permission} from "../application/auth/permission";
import {FormType} from "@shared/application/form/form-type";
import {FormModalSchemaBuilder} from "@shared/application/form-modal-schema-builder";
import {ResourceCreatorModalForm} from "@shared/application/resource-creator-modal-form";
import {ResourceUpdaterModalForm} from "@shared/application/resource-updater-modal-form";
import {ResourceReaderFormModal} from "@shared/application/resource-reader-form-modal";
import {ResourceDestroyerFormModal} from "@shared/application/resource-destroyer-form-modal";

export interface CRUDSchema {
    create?: FormSchema | undefined;
    edit?: FormSchema | undefined;
    read?: FormSchema | undefined;
    destroy?: FormSchema | undefined;

    [key: string]: FormSchema | undefined;
}

export interface CRUDModalSchema {
    [key: string]: FormModalSchemaBuilder
}

export class CRUDSchemaBuilder {
    private schema: CRUDModalSchema = {};
    private options: { click: string, name: string }[] = [];

    constructor(module: string, crudSchema: CRUDSchema, permissions: Permission | null = new Permission(module)) {
        if (permissions) {
            permissions.hasPermissions(crudSchema);
        }
        Object.entries(crudSchema).forEach((entry: [string, FormSchema | undefined]) => {
            this.schema[entry[0]] = CRUDSchemaBuilder.factory(entry[0]);
            this.schema[entry[0]].schema = entry[1];
            this.options.push(this.schema[entry[0]].getContextualOption());
        });
    }

    get reader(): ResourceReaderFormModal {
        return this.schema.read;
    }

    get updater(): ResourceUpdaterModalForm {
        return this.schema.edit;
    }

    get destroyer(): ResourceDestroyerFormModal {
        return this.schema.destroy;
    }

    get creator(): ResourceCreatorModalForm {
        return this.schema.create;
    }

    get canBeRead(): boolean {
        return this.hasProperty(FormType.Read);
    }

    get canBeUpdate(): boolean {
        return this.hasProperty(FormType.Update);
    }

    get canBeDestroy(): boolean {
        return this.hasProperty(FormType.Destroy);
    }

    get canBeCreate() {
        return this.hasProperty(FormType.Create);
    }

    static factory(formType: string): ResourceUpdaterModalForm {
        switch (formType) {
            case FormType.Update:
                return new ResourceUpdaterModalForm();
            case FormType.Destroy:
                return new ResourceDestroyerFormModal();
            case FormType.Create:
                return new ResourceCreatorModalForm();
            case FormType.Read:
            default:
                return new ResourceReaderFormModal();
        }
    }

    getOptions() {
        return this.options;
    }

    private hasProperty(property: string) {
        return this.schema.hasOwnProperty(property);
    }
}
