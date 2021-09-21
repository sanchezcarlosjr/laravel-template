import {FormModalSchemaBuilder} from "@shared/application/form-modal-schema-builder";
import {FormType} from "@shared/application/form/form-type";
import {UpsertMutation} from "@shared/application/upsert-mutation";
import {FormSchema} from "@shared/application/form-schema";

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
