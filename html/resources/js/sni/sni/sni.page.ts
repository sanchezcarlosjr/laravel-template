import Vue from "vue";
import Component from "vue-class-component";
import {employees} from "@shared/repositories/employees/repository";
import {validator as GraphQLSelectIdValidator} from "@shared/application/form-fields/vfg-field-select-graphql-id/vfg-field-select-graphql-id";
import {sni_areas, snis} from "@shared/repositories/sni/repository";
import {campus, close_to_expire, close_to_retirement, gender} from "@shared/search-criteria/search-criteria";
import SniStatistics from "./statistics/index.vue";
import {Permission} from "@shared/application/auth/permission";

const schema = {
    legend: "SNI",
    fields: [
        {
            type: 'graphql-select-id',
            label: 'Nombre del empleado*',
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
            type: 'calendar',
            label: 'Fecha de inicio',
            model: "start_date",
            default: new Date('1-1-2021')
        },
        {
            type: 'calendar',
            label: 'Fecha de fin',
            model: "finish_date",
            default: new Date('12-31-2021')
        },
        {
            type: 'select',
            label: 'Nivel',
            model: 'level',
            values: ["Candidato", "Nivel 1", "Nivel 2", "Nivel 3", "Emérito"]
        },
        {
            type: 'graphql-select-id',
            label: 'Área SNI*',
            model: "sni_area.name",
            query: {
                resource: sni_areas,
                target: "name",
                ref: "sni_area_id",
                scopes: [{
                    name: "name_like"
                }]
            },
            required: true,
            validator: GraphQLSelectIdValidator({
                selectValid: "Seleccione un área válida"
            })
        },
        {
            type: 'input',
            inputType: 'text',
            label: 'Disciplina',
            model: "discipline"
        },
        {
            type: 'input',
            inputType: 'text',
            label: 'Campo',
            model: "field"
        },
        {
            type: 'input',
            inputType: 'text',
            label: 'Especialidad',
            model: "specialty"
        },
        {
            type: "upload2",
            label: 'Nombramiento',
            model: 'nombramiento_url'
        }
    ]
};
const editSchema = {
    legend: schema.legend,
    fields: [
        ...schema.fields,
        {
            type: 'label',
            label: 'Correo electrónico',
            model: 'employee.correo1'
        },
        {
            type: 'label',
            label: 'Unidad Académica',
            model: 'employee.academic_unit.name'
        },
        {
            type: 'label',
            label: 'Sexo',
            model: 'employee.sexo'
        },
        {
            type: 'label',
            label: 'Grado',
            model: 'employee.grado'
        },
        {
            type: 'label',
            label: '¿Es PTC?',
            model: 'employee.is_ptc',
            get: (employee: { is_ptc: boolean }) => (employee && employee.is_ptc) ? "Sí" : "No"
        },
        {
            type: "label",
            label: "¿Es un perfil PRODEP activo?",
            model: "employee.has_active_prodep_profile",
            get: (employee: { has_active_prodep_profile: boolean }) => (employee && employee.has_active_prodep_profile) ? "Sí" : "No"
        },
        {
            type: 'label',
            label: '¿Es un SNI activo?',
            model: 'employee.has_active_sni',
            get: (employee: { has_active_sni: boolean }) => (employee && employee.has_active_sni) ? "Sí" : "No"
        },
        {
            type: 'label',
            label: '¿Es un profesor-investigador?',
            model: 'employee.is_researcher',
            get: (employee: { is_researcher: boolean }) => (employee && employee.is_researcher) ? "Sí" : "No"
        }
    ]
};

const permission = new Permission('/sni', {
    create: schema,
    edit: editSchema,
    destroy: {
        legend: schema.legend,
        fields: [
            {
                type: "label",
                label: "¿Desea remover el probatorio de este SNI?",
                hint: "Acción irreversible.",
                model: "employee.name"
            }
        ]
    }
});

@Component(
    {
        components: {
            SniStatistics
        }
    }
)
export default class SniPage extends Vue {
    criteria = [
        gender,
        campus,
        close_to_retirement,
        close_to_expire,
    ];
    resource = snis;
    fields = [
        {key: "employee.name", label: "Investigador", sortable: true, editable: true, class: "vw-20"},
        {key: "employee.academic_unit.name", label: "Unidad académica", sortable: true, editable: true},
        {key: "level", label: "Nivel", sortable: true, editable: true},
        {key: "start_date", label: "Fecha de inicio", sortable: true, editable: true},
        {key: "finish_date", label: "Fecha fin", sortable: true, editable: true},
        {key: "sni_area.name", label: "Área SNI", sortable: true, editable: true}
    ];
    formSchemas = permission.hasPermissions();
}
