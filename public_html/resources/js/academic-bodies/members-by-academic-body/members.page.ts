import {Component, Vue} from 'vue-property-decorator';
import {validator as GraphQLSelectIdValidator} from "../../@shared/application/form-fields/vfg-field-select-graphql-id/vfg-field-select-graphql-id"
import {members} from "../../@shared/repositories/academic_bodies/members/repository.ts";
import {employees} from "../../@shared/repositories/employees/repository.ts";
import {lgac} from "../../@shared/repositories/academic_bodies/lgac/repository.ts";
import {campus, close_to_retirement} from "../../@shared/search-criteria/search-criteria.ts";
import {Permission} from "../../store/auth/permission";
import {membersForm} from "../members/members.page";

let fields = [
    {key: 'is_leader', sortable: true},
    {key: 'name', label: 'Nombre', sortable: true, class: 'w-40'},
    {key: 'academic_unit.name', label: 'Unidad Académica', sortable: true},
    {key: 'academic_unit.campus', label: 'Campus', sortable: true},
    {key: 'academic_bodies_lgacs.name', sortable: true, column: 'academic_bodies_lgacs'}
];

@Component
export default class MembersPage extends Vue {
    resource = members;
    fields = fields;
    criteria = [
        close_to_retirement,
        campus
    ];
    formSchemas = new Permission('/cuerpos-academicos/:academic_body_id/miembros', {
        create: {
            legend: "Miembro",
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
                            },
                            {
                                name: "candidates_for",
                                value: Number(this.$route.params.academic_body_id)
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
                    type: 'tags',
                    label: 'LGAC',
                    model: 'lgac_ids',
                    query: {
                        resource: lgac,
                        target: "name",
                        scopes: [
                            {
                                name: "academic_body_id",
                                value: Number(this.$route.params.academic_body_id)
                            }
                        ]
                    }
                },
                {
                    type: "switch2",
                    label: "Liderazgo",
                    model: "is_leader",
                    textOn: "Es el líder del cuerpo académico",
                    textOff: "No es el líder del cuerpo académico"
                }
            ]
        },
        read: {
            legend: "Empleado",
            fields: [
                {
                    type: 'label',
                    label: 'Nombre',
                    model: 'name'
                },
                {
                    type: 'label',
                    label: 'Correo electrónico',
                    model: 'correo1'
                },
                {
                    type: 'label',
                    label: 'Edad',
                    model: 'age'
                },
                {
                    type: 'label',
                    label: 'Unidad Académica',
                    model: 'academic_unit.name'
                },
                {
                    type: 'label',
                    label: 'Sexo',
                    model: 'sexo'
                },
                {
                    type: 'label',
                    label: 'Grado',
                    model: 'grado'
                },
                {
                    type: 'label',
                    label: '¿Es PTC?',
                    model: 'is_ptc',
                    get: (employee: { is_ptc: boolean }) => (employee && employee.is_ptc) ? "Sí" : "No"
                },
                {
                    type: "label",
                    label: "¿Es un perfil PRODEP activo?",
                    model: "has_active_prodep_profile",
                    get: (employee: { has_active_prodep_profile: boolean }) => (employee && employee.has_active_prodep_profile) ? "Sí" : "No"
                },
                {
                    type: 'label',
                    label: '¿Es un SNI activo?',
                    model: 'has_active_sni',
                    get: (employee: { has_active_sni: boolean }) => (employee && employee.has_active_sni) ? "Sí" : "No"
                },
                {
                    type: 'label',
                    label: '¿Es un profesor-investigador?',
                    model: 'is_researcher',
                    get: (employee: { is_researcher: boolean }) => (employee && employee.is_researcher) ? "Sí" : "No"
                }
            ]
        }
    }).hasPermissions();

    rowClass = (employee: { is_leader: boolean }) => {
        return employee?.is_leader ? 'font-weight-bold' : '';
    };


    // apiResource = new MembersRepository('academic_body', 'employees');
    // spanishResourceName = 'miembro'
    // toolbar = new Set<string>(['add', 'remove', 'reads']);

}
