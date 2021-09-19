import Vue from "vue";
import Component from "vue-class-component";
import {users} from "@shared/repositories/users/repository";
import {employees} from "@shared/repositories/employees/repository";
import {campus, gender} from "@shared/search-criteria/search-criteria";
import {Permission} from "@shared/application/auth/permission";
import {CRUDSchemaBuilder} from "@shared/application/CRUDSchema";

const words = [
    'Erg0',
    'c0g1t0',
    'sum',
    'v1d1',
    'v1n1',
    'v3nc1',
    'Kr1t1k',
    'der',
    'praktisch3n',
    'V3rnunft',
    'Kr1t1k',
    'r3in3n',
    'buffalo',
    'buffal0',
    'buffal0',
    'buffal0',
    'si',
    'el',
    'g3n3r0',
    's3',
    'ha11a',
    '3n',
    'pr0gr3s0',
    'c0nstant3',
    'hacia',
    'm3j0r'
];

function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
}

const schema = {
    legend: "usuario",
    fields: [
        {
            type: 'graphql-select-id',
            label: 'Nombre del empleado*',
            id: "usuario_nombre_empleado",
            model: "employee.name",
            query: {
                resource: employees,
                target: "name",
                ref: "nempleado",
                scopes: [
                    {
                        name: "name_or_id"
                    }
                ]
            },
            required: false,
            hint: "Número de Empleado: "
        },
        {
            type: 'api-select',
            label: 'Rol',
            model: "rol_id",
            api: 'api/roles',
            textKey: 'rol'
        }
    ]
};

@Component
export default class UsersPage extends Vue {
    criteria = [
        gender,
        campus,
    ];
    formSchemas = new CRUDSchemaBuilder('/usuarios', {
        destroy: {
            legend: schema.legend,
            fields: [
                {
                    type: "label",
                    label: "¿Desea eliminar a este usuario?",
                    hint: "Acción irreversible",
                    model: "employee.name"
                }
            ]
        },
        edit: schema,
        create: {
            legend: schema.legend,
            fields: [
                ...schema.fields,
                {
                    type: 'input',
                    inputType: "text",
                    disabled: true,
                    label: 'Contraseña',
                    model: "contrasena",
                    get: function (model: { contrasena: string }) {
                        model.contrasena = words[random(0, words.length - 1)] + words[random(0, words.length - 1)] + words[random(0, words.length - 1)];
                        return model.contrasena;
                    }
                }
            ]
        }
    });
    fields = [
        {key: 'employee.name', label: 'Nombre', sortable: true, class: 'vw-20'},
        {key: 'employee.correo1', label: 'Correo Electrónico', sortable: true},
        {key: 'employee.academic_unit.name', label: 'Unidad Académica', sortable: true},
        {key: 'employee.academic_unit.campus', label: 'Campus', sortable: true},
        {key: 'role', label: "Rol", sortable: true}
    ];
    resource = users;
}

