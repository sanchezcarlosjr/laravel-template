import {Component, Vue} from 'vue-property-decorator';
import {validator as GraphQLSelectIdValidator} from "@shared/application/form-fields/vfg-field-select-graphql-id/vfg-field-select-graphql-id"
import {members} from "@shared/repositories/academic_bodies/members/repository.ts";
import {employees} from "@shared/repositories/employees/repository.ts";
import {lgac} from "@shared/repositories/academic_bodies/lgac/repository.ts";
import {campus, close_to_retirement} from "@shared/search-criteria/search-criteria.ts";
import {CRUDSchemaBuilder} from "@shared/application/form/CRUDSchema";
import {membersForm} from "../members/membersForm";

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
    formSchemas = new CRUDSchemaBuilder('/cuerpos-academicos/:academic_body_id/miembros', {
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
        destroy: {
            legend: "Miembro",
            fields: [
                {
                    type: "label",
                    label: "¿Desea remover a este miembro de este cuerpo académico?",
                    hint: "Acción irreversible.",
                    model: "name"
                }
            ]
        },
        read: membersForm
    });

    rowClass = (employee: { is_leader: boolean }) => {
        return employee?.is_leader ? 'font-weight-bold' : '';
    };


    // apiResource = new MembersRepository('academic_body', 'employees');
    // spanishResourceName = 'miembro'
    // toolbar = new Set<string>(['add', 'remove', 'reads']);

}
