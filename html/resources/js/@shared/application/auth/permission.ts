import state from "../../../store/store";
import {FormField} from "@shared/application/form-schema";
import {CRUDSchema} from "@shared/application/CRUDSchema";


export class Permission {
    constructor(private module: string) {
    }

    hasPermissions(formSchema: CRUDSchema) {
        if (state.user.permissions[this.module] &&
            !state.user.permissions[this.module]['edit'] &&
            state.user.permissions[this.module]['read'] &&
            !formSchema.hasOwnProperty('read') &&
            formSchema.hasOwnProperty('edit')
        ) {
            formSchema['read'] = {
                legend: formSchema['edit']?.legend ?? "",
                fields: formSchema['edit']?.fields.map((field: any): FormField => {
                    return {
                        ...field,
                        readonly: true,
                        disabled: true
                    }
                }) ?? []
            }
        }
        Object.keys(formSchema).filter((schema) => {
            return !state.user.permissions.hasOwnProperty(this.module) || !state.user.permissions[this.module][schema];
        }).forEach((key: string) => delete formSchema[key]);
        return formSchema;
    }
}
