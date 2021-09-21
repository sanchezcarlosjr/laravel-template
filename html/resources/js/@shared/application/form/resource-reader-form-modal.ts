import {FormModalSchemaBuilder} from "@shared/application/form-modal-schema-builder";
import {ReaderMutation} from "@shared/application/reader-mutation";
import {FormType} from "@shared/application/form/form-type";

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
