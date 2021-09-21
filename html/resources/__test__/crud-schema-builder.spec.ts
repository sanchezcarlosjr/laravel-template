import {CRUDSchemaBuilder, CRUDSchema} from "../js/@shared/application/CRUDSchema";
import {FormType} from "../js/@shared/application/form/form-type";
import {ResourceCreatorModalForm} from "../js/@shared/application/resource-creator-modal-form";
import {ResourceUpdaterModalForm} from "../js/@shared/application/resource-updater-modal-form";
import {ResourceReaderFormModal} from "../js/@shared/application/resource-reader-form-modal";
import {ResourceDestroyerFormModal} from "../js/@shared/application/resource-destroyer-form-modal";

describe('CRUD Schema Builder', () => {
    const crudSchema: CRUDSchema = {read: {fields: []}, destroy: {fields: []}, create: {fields: []}, edit: {fields: []}};

    test('It should not be read, destroy, update, create if read, destroy, update and create field exist', () => {
        const crudModalFormSchema = new CRUDSchemaBuilder('', crudSchema, null);
        expect(crudModalFormSchema.canBeRead).toBeTruthy();
        expect(crudModalFormSchema.canBeDestroy).toBeTruthy();
        expect(crudModalFormSchema.canBeCreate).toBeTruthy();
        expect(crudModalFormSchema.canBeUpdate).toBeTruthy();
    });
    test('It should not be read, destroy, update, create if read, destroy, update and create field don\'t exist', () => {
        const crudModalFormSchema = new CRUDSchemaBuilder('', {}, null);
        expect(crudModalFormSchema.canBeRead).toBeFalsy();
        expect(crudModalFormSchema.canBeUpdate).toBeFalsy();
        expect(crudModalFormSchema.canBeDestroy).toBeFalsy();
        expect(crudModalFormSchema.canBeCreate).toBeFalsy();
    });
    test('It should load the full schema', () => {
        const schemaBuilder = new CRUDSchemaBuilder('', crudSchema, null);
        expect(schemaBuilder.reader instanceof ResourceReaderFormModal).toBeTruthy();
        expect(schemaBuilder.reader.ref).toBe(FormType.Read);
        expect(schemaBuilder.updater instanceof ResourceUpdaterModalForm).toBeTruthy();
        expect(schemaBuilder.updater.ref).toBe(FormType.Update);
        expect(schemaBuilder.destroyer instanceof ResourceDestroyerFormModal).toBeTruthy();
        expect(schemaBuilder.destroyer.ref).toBe(FormType.Destroy);
        expect(schemaBuilder.creator instanceof ResourceCreatorModalForm).toBeTruthy();
        expect(schemaBuilder.creator.ref).toBe(FormType.Create);
    });
})
