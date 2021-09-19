import {Component, Vue} from 'vue-property-decorator';
import {collaborators} from "@shared/repositories/academic_bodies/collaborators/repository.ts";
import {employees} from "@shared/repositories/employees/repository.ts";
import {validator as GraphQLSelectIdValidator} from "@shared/application/form-fields/vfg-field-select-graphql-id/vfg-field-select-graphql-id"
import {CRUDSchemaBuilder} from "@shared/application/CRUDSchema";
import {membersForm} from "../members/membersForm";

const builder = new CRUDSchemaBuilder('/cuerpos-academicos/:academic_body_id/colaboradores', {
    create: {
        legend: "Colaborador",
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
            }
        ]
    },
    destroy: {
        legend: "Colaborador",
        fields: [
            {
                type: "label",
                label: "¿Desea remover a este colaborador de este cuerpo académico?",
                hint: "Acción irreversible.",
                model: "name"
            }
        ]
    },
    read: membersForm
});

@Component
export default class CollaboratorsPage extends Vue {
    resource = collaborators;
    criteria = [];
    formSchemas = builder;
    fields = [
        {key: 'name', label: 'Nombre', sortable: true, class: 'w-40'},
        {key: 'academic_unit.name', label: 'Unidad Académica', sortable: true},
        {key: 'academic_unit.campus', label: 'Campus', sortable: true}
    ];
}
