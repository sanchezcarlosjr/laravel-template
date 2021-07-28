import state from "../store";

export interface FormSchema {
    create?: any;
    edit?: any;
    read?: any;
    [key: string]: any;
}

export class Permission {
    constructor(private module: string, private formSchema: FormSchema) {
        if (state.user.permissions[this.module] &&
            !state.user.permissions[this.module]['edit'] &&
            state.user.permissions[this.module]['read'] &&
            !this.formSchema.hasOwnProperty('read') &&
            this.formSchema.hasOwnProperty('edit')
        ) {
            this.formSchema['read'] = {
                legend: this.formSchema['edit'].legend,
                fields: this.formSchema['edit'].fields.map((field: any) => {
                    return {
                        ...field,
                        readonly: true,
                        disabled: true
                    }
                })
            }
        }
        Object.keys(this.formSchema).filter((schema) => {
            return !state.user.permissions.hasOwnProperty(this.module) || !state.user.permissions[this.module][schema];
        }).forEach((key: string) => delete this.formSchema[key]);
    }

    hasPermissions() {
        return this.formSchema;
    }
}
