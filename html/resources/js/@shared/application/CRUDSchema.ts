import {FormSchema} from "@shared/application/form/form-schema";

export interface CRUDSchema {
    create?: FormSchema | undefined;
    edit?: FormSchema | undefined;
    read?: FormSchema | undefined;
    destroy?: FormSchema | undefined;

    [key: string]: FormSchema | undefined;
}
