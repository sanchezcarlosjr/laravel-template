import {FormModalSchemaBuilder} from "@shared/application/form/form-modal-schema-builder";
import {FormType} from "@shared/application/form/form-type";
import {DestroyerMutation} from "@shared/application/form/destroyer-mutation";

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
