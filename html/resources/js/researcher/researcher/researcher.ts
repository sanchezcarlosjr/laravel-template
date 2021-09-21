import Vue from "vue";
import Component from "vue-class-component";
import GraphQLResourceRepository from "@shared/infraestructure/GraphQLResourceRepository";
import {employees} from "@shared/repositories/employees/repository";
import {validator as GraphQLSelectIdValidator} from "@shared/application/form-fields/vfg-field-select-graphql-id/vfg-field-select-graphql-id";
import {campus, gender, validity} from "@shared/search-criteria/search-criteria";
import {CRUDSchemaBuilder} from "@shared/application/form/CRUDSchema";

const schema = {
    legend: "profesor-investigador",
    fields: [
        {
            type: 'graphql-select-id',
            label: 'Nombre del employee*',
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
            hint: "Número de employee: ",
            validator: GraphQLSelectIdValidator({
                selectValid: "Seleccione un employee válido"
            })
        },
        {
            type: 'select',
            label: 'Probatorio',
            model: 'probatorio',
            values: function () {
                return [
                    {id: 0, name: "PROMEP"},
                    {id: 1, name: "SNI"},
                    {id: 2, name: "SNCA"}
                ]
            },
        },
        {
            type: 'calendar',
            label: 'Vigente Hasta',
            model: "vigenteHasta"
        }
    ]
};

const formSchema = new CRUDSchemaBuilder('/investigadores', {
    edit: schema,
    create: schema,
    destroy: {
        legend: schema.legend,
        fields: [
            {
                type: "label",
                label: "¿Desea remover el probatorio de este investigador?",
                hint: "Acción irreversible.",
                model: "employee.name"
            }
        ]
    }
});

@Component
export default class Researcher extends Vue {
    criteria = [
        validity,
        gender,
        campus
    ];
    formSchemas = formSchema;
    fields = [
        {key: 'employee.name', label: 'Nombre', sortable: true, class: "vw-20"},
        {key: 'employee.sexo', label: 'Nivel', sortable: true},
        {key: 'employee.sexo', label: 'Género', sortable: true},
        {key: 'employee.grado', label: 'Grado', sortable: true},
        {key: 'employee.sexo', label: 'Área de conocimiento', sortable: true},
        {key: 'employee.academic_unit.campus', label: 'Campus', sortable: true},
        {key: 'employee.academic_unit.name', label: 'Unidad académica', sortable: true},
    ];
    resource = new GraphQLResourceRepository(
        {
            singular: "researcher",
            plural: "researchers"
        }
    );
}
