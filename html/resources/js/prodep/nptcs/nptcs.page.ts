import {Component, Vue} from 'vue-property-decorator';
import VueFormGenerator from 'vue-form-generator';
import {validator as GraphQLSelectIdValidator} from "../../@shared/application/form-fields/vfg-field-select-graphql-id/vfg-field-select-graphql-id"
import {prodep_nptcs} from "../../@shared/repositories/prodep/repository.ts";
import {employees} from "../../@shared/repositories/employees/repository.ts";
import {authorized, campus, extended} from "../../@shared/search-criteria/search-criteria.ts";
import {Permission} from "../../@shared/application/auth/permission";

let schema = {
    legend: "Apoyo a NPTC",
    size: "lg",
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
            type: "input",
            inputType: "text",
            label: "Folio",
            model: "folio"
        },
        {
            type: "rubro",
            label: "Apoyo para elementos individuales de trabajo",
            model: "rubro1",
            rubros: [
                {
                    nombre: "Acervo Bibliográfico o informático"
                },
                {
                    nombre: "Actualización de Equipo de Cómputo o Periférico"
                },
                {
                    nombre: "Equipo de Cómputo de Escritorio o Portátil"
                }
            ]
        },
        {
            type: "rubro",
            label: "Apoyo de fomento a la permanencia institucional",
            model: "rubro2",
            rubros: [
                {
                    nombre: "Apoyo de fomento a la permanencia institucional"
                }
            ]
        },
        {
            type: "rubro",
            label: "Apoyo para elementos individuales de trabajo",
            model: "rubro3",
            rubros: [
                {
                    nombre: "Equipo"
                },
                {
                    nombre: "Estancias Cortas"
                },
                {
                    nombre: "Gastos de Trabajo de Campo"
                },
                {
                    nombre: "Materiales y Consumibles"
                },
                {
                    nombre: "Asistencia a Reuniones Académicas"
                },
                {
                    nombre: "Equipo para Experimentación"
                }
            ]
        },
        {
            type: 'calendar',
            label: 'Fecha de apoyo*',
            model: 'start_date',
            required: true,
            validator: VueFormGenerator.validators.date.locale({
                fieldIsRequired: "Este campo es obligatorio"
            })
        },
        {
            type: "switch2",
            label: "Con prorroga?",
            model: "extension"
        },
        {
            type: "switch2",
            label: "Aceptado?",
            model: "authorized"
        }
    ]
};
const permission = new Permission('/prodep/nptcs', {
    create: schema
});

@Component
export default class NptcsPage extends Vue {
    resource = prodep_nptcs;
    criteria = [campus, authorized, extended];
    fields = [
        {key: "employee.name", label: "Beneficiario", sortable: true, class: "vw-20"},
        /** Send to Detalles */
        {key: "amount", label: "Monto", sortable: true},
        {key: "employee.academic_unit.name", label: "Unidad académica", sortable: true},
        {key: "start_date", label: "Fecha Inicio", sortable: true}
    ];
    formSchemas = permission.hasPermissions();
}
