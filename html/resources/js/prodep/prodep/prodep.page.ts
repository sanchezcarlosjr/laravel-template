import {Component, Vue} from 'vue-property-decorator';
import VueFormGenerator from 'vue-form-generator';
import {validator as GraphQLSelectIdValidator} from "@shared/application/form-fields/vfg-field-select-graphql-id/vfg-field-select-graphql-id"
import {prodep_areas, prodep_profiles} from "@shared/repositories/prodep/repository.ts";
import {employees} from "@shared/repositories/employees/repository.ts";
import {campus, close_to_retirement, gender, validity} from "@shared/search-criteria/search-criteria.ts";
import {Permission} from "@shared/application/auth/permission";
import {CRUDSchemaBuilder} from "@shared/application/CRUDSchema";

let fields = [
    {key: 'employee.name', label: 'Nombre', sortable: true, class: "vw-20"},
    {key: 'employee.id', label: 'No. Empleado', sortable: true},
    {key: `employee.academic_unit.name`, label: 'Unidad Académica', sortable: true},
    {key: 'start_date', label: 'Fecha inicio', sortable: true},
    {key: 'finish_date', label: 'Fecha fin', sortable: true},
    {key: 'prodep_area.name', label: 'Área de conocimiento', sortable: true, class: "vw-20"},
];

let schema = {
    legend: "Perfil PRODEP",
    fields: [
        {
            type: 'calendar',
            label: 'Fecha de inicio*',
            model: 'start_date',
            required: true,
            validator: VueFormGenerator.validators.date.locale({
                fieldIsRequired: "Este campo es obligatorio"
            })
        },
        {
            type: 'input',
            inputType: 'number',
            label: 'Años de vigencia*',
            min: 3,
            max: 6,
            required: true,
            model: 'years_to_finish',
            validator: VueFormGenerator.validators.number.locale({
                numberTooSmall: "Años de vigencia no puede ser menor a 3 años",
                numberTooBig: "Años de vigencia no puede ser mayora a 6 años",
                fieldIsRequired: "Este campo es obligatorio"
            })
        },
        {
            type: 'graphql-select-id',
            label: 'Nombre del empleado beneficiado*',
            model: "employee.name",
            query: {
                resource: employees,
                target: "name",
                ref: "employee_id",
                scopes: [
                    {
                        name: "name_or_id"
                    }
                ]
            },
            required: true,
            hint: "Número de Empleado: ",
            validator: GraphQLSelectIdValidator({
                selectValid: "Seleccione un empleado válido"
            })
        },
        {
            type: 'graphql-select-id',
            label: 'Área de conocimiento*',
            model: "prodep_area.name",
            query: {
                resource: prodep_areas,
                target: "name",
                ref: "prodep_area_id",
                scopes: [{
                    name: "name_like"
                }]
            },
            required: true,
            validator: GraphQLSelectIdValidator({
                selectValid: "Seleccione un área válida"
            })
        }
    ]
};


const builder = new CRUDSchemaBuilder('/prodep/apoyos', {
    create: schema,
    edit: schema,
    destroy: {
        legend: schema.legend,
        fields: [
            {
                type: "label",
                label: "¿Desea remover este apoyo?",
                hint: "Acción irreversible.",
                model: "employee.name"
            }
        ]
    }
});

@Component
export default class ProdepPage extends Vue {
    resource = prodep_profiles;
    criteria = [
        validity,
        campus,
        gender,
        close_to_retirement
    ];
    fields = fields;
    formSchemas = builder;
}
