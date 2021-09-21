import {FormModalSchemaBuilder} from "@shared/application/form-modal-schema-builder";
import {FormType} from "@shared/application/form/form-type";
import {UpsertMutation} from "@shared/application/upsert-mutation";

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
