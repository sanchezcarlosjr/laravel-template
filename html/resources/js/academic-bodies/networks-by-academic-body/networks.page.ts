import Vue from "vue";
import Component from "vue-class-component";
import {networks} from "../../@shared/repositories/academic_bodies/networks/repository";
import {Permission} from "../../store/auth/permission";
import {employees} from "../../@shared/repositories/employees/repository";

const permission = new Permission('/cuerpos-academicos/:academic_body_id/redes', {
    create: {
        legend: "nueva red",
        fields: [
            {
                type: 'input',
                inputType: 'text',
                label: 'Nombre',
                model: 'name'
            },
            {
                type: 'select',
                label: 'Alcance',
                model: 'range',
                values: ['Local', 'Regional', 'Nacional', 'Internacional']
            },
            {
                type: 'calendar',
                label: 'Fecha de inicio',
                model: 'start_date'
            },
            {
                type: 'calendar',
                label: 'Fecha de fin',
                model: 'finish_date'
            },
            {
                type: "upload2",
                label: 'Formalización',
                model: 'formation_url'
            },
            {
                type: "array",
                label: "Colaboradores",
                model: "collaborators",
                schema: {
                    fields: [
                        {
                            type: 'input',
                            id: "name2",
                            inputType: 'text',
                            label: 'Nombre',
                            model: 'name'
                        },
                        {
                            type: 'select',
                            label: 'Tipo',
                            model: 'type',
                            values: ['Institución', 'Grupo', 'Cuerpo Académico']
                        },
                        {
                            type: "switch2",
                            label: "Liderazgo",
                            model: "is_leader",
                            textOn: "Es el líder de la red",
                            textOff: "No es el líder de la red"
                        }
                    ]
                }
            }
        ]
    },
    read: {
        legend: "la red",
        fields: [
            {
                type: 'input',
                inputType: 'text',
                label: 'Nombre',
                model: 'name'
            },
            {
                type: 'select',
                label: 'Alcance',
                model: 'range',
                values: ['Local', 'Regional', 'Nacional', 'Internacional']
            },
            {
                type: 'calendar',
                label: 'Fecha de inicio',
                model: 'start_date'
            },
            {
                type: 'calendar',
                label: 'Fecha de fin',
                model: 'finish_date'
            },
            {
                type: "upload2",
                label: 'Formalización',
                model: 'formation_url'
            },
            {
                type: "array",
                label: "Colaboradores",
                model: "collaborators",
                selection: `
                    collaborators {
                        id
                        name
                        type
                    }
                `,
                schema: {
                    fields: [
                        {
                            type: 'input',
                            id: "name2",
                            inputType: 'text',
                            label: 'Nombre',
                            model: 'name'
                        },
                        {
                            type: 'select',
                            label: 'Tipo',
                            model: 'type',
                            values: ['Institución', 'Grupo', 'Cuerpo Académico']
                        },
                        {
                            type: "switch2",
                            label: "Liderazgo",
                            model: "is_leader",
                            textOn: "Es el líder de la red",
                            textOff: "No es el líder de la red"
                        }
                    ]
                }
            }
        ]
    }
});

@Component
export default class NetworksPage extends Vue {
    apiResource = networks;
    fields = [
        {key: 'name', label: 'Nombre', sortable: true},
        {key: 'leader.name', label: 'Líder', sortable: true},
        {key: 'range', label: 'Alcance', sortable: true},
        {key: 'start_date', label: 'Fecha de inicio', sortable: true},
        {key: 'finish_date', label: 'Fecha de fin', sortable: true},
    ];
    defaultCriteria = [
        {
            type: "or",
            criteria: [
                {
                    value: 'Líderes',
                }
            ]
        },
        {
            type: "xor",
            criteria: [
                {
                    value: 'Mexicali'
                },
                {
                    value: 'Ensenada'
                },
                {
                    value: 'Tijuana'
                }
            ]
        }
    ];
    formSchemas = permission.hasPermissions();
}
