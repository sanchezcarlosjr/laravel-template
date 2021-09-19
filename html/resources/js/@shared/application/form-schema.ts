import {FormModalSchemaBuilder, FormType} from "@shared/application/form-type";

export interface FormField {
    type: string;
    label: string;
    model?: string;
    hint?: string;
    readonly?: boolean;
    disabled?: boolean;
    query?: any;
    inputType?: any;
    required?: boolean;
    values?: any;
    get?: (args: any) => any;
    schema?: FormSchema;
    textOn?: string;
    selection?: string;
    textOff?: string;
    id?: string;
    visible?: (model: any) => boolean;
    validator?: (value: any, schema: any, model: any) => string[];
}

export interface FormSchema {
    legend?: string;
    size?:  string;
    inject?: ((model: any) => Promise<void>)[];
    formType?: FormType | FormModalSchemaBuilder;
    fields: FormField[];
}


