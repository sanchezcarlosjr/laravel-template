import {Component, Vue} from 'vue-property-decorator';
import VueFormGenerator from 'vue-form-generator';
import {lgac} from "@shared/repositories/academic_bodies/lgac/repository.ts";
import {CRUDSchemaBuilder} from "@shared/application/CRUDSchema";

const schema = {
    legend: "LGAC",
    fields: [
        {
            type: 'input',
            inputType: 'text',
            label: 'Nombre de la LGAC*',
            model: 'name',
            required: true,
            validator: VueFormGenerator.validators.string.locale({
                fieldIsRequired: "Este campo es obligatorio"
            })
        },
        {
            type: 'input',
            inputType: 'text',
            label: 'Descripción',
            model: 'description'
        }
    ]
};

const builder = new CRUDSchemaBuilder('/cuerpos-academicos/:academic_body_id/lgac', {
    create: schema,
    edit: schema,
    destroy: {
        legend: schema.legend,
        fields: [
            {
                type: "label",
                label: "¿Desea eliminar esta LGAC?",
                hint: "Acción irreversible.",
                model: "name"
            }
        ]
    }
});

@Component
export default class LGACPage extends Vue {
    resource = lgac;
    criteria = [];
    fields = [
        {key: 'name', label: 'Nombre', sortable: true},
        {key: 'description', label: 'Descripción', sortable: true}
    ];
    formSchemas = builder;
}
