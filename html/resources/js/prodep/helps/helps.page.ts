import {Component, Vue} from 'vue-property-decorator';
import VueFormGenerator from 'vue-form-generator';
import {validator as GraphQLSelectIdValidator} from "@shared/application/form-fields/vfg-field-select-graphql-id/vfg-field-select-graphql-id"
import {prodep_helps} from "@shared/repositories/prodep/repository.ts";
import {employees} from "@shared/repositories/employees/repository.ts";
import {campus, close_to_retirement, gender} from "@shared/search-criteria/search-criteria.ts";
import {Permission} from "@shared/application/auth/permission";

let fields = [
    {key: "employee.name", label: "Beneficiario", sortable: true},
    {key: "type_name", label: "Tipo", sortable: true},
    {key: "amount", label: "Cantidad", sortable: true},
    {key: "date", label: "Fecha", sortable: true},
    {key: `employee.academic_unit.name`, label: 'Unidad Académica', sortable: true},
];

let schema = {
    legend: "Ayuda PRODEP",
    fields: [
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
            type: 'select',
            label: 'Tipo de beneficio*',
            model: 'type',
            selectOptions: {
                noneSelectedText: "Seleccione un tipo"
            },
            values: [
                {
                    name: "Apoyo inicial",
                    id: "0"
                },
                {
                    name: "Apoyo complementario",
                    id: "1"
                },
                {
                    name: "Apoyo 6 años",
                    id: "2"
                },
                {
                    name: "Estancias cortas",
                    id: "3"
                },
                {
                    name: "Apoyo publicación",
                    id: "4"
                }
            ],
            validator: (value: string) => {
                let errors = [];
                if (!value) {
                    errors.push("Selecciona una opción");
                }
                if (parseInt(value) > 4 || parseInt(value) < 0) {
                    errors.push("Opción desconocida");
                }
                return errors;
            }
        },
        {
            type: 'input',
            inputType: 'number',
            label: 'Cantidad de apoyo',
            model: 'amount',
            required: true,
            validator: VueFormGenerator.validators.number.locale({
                fieldIsRequired: "Este campo es obligatorio"
            })
        },
        {
            type: 'calendar',
            label: 'Fecha de apoyo',
            model: 'date',
            required: true,
            validator: VueFormGenerator.validators.date.locale({
                fieldIsRequired: "Este campo es obligatorio"
            })
        }
    ]
};

const permission = new Permission('/prodep/apoyos', {
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
export default class HelpsPage extends Vue {
    resource = prodep_helps;
    criteria = [
        campus,
        gender,
        close_to_retirement
    ];
    fields = fields;
    formSchemas = permission.hasPermissions();
}
