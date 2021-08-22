import Vue from "vue";
import Component from "vue-class-component";
import {networks} from "../../@shared/repositories/academic_bodies/networks/repository";
import {Permission} from "../../store/auth/permission";

const permission = new Permission('/cuerpos-academicos/redes', {
    read: {
        legend: "los colaboradores de la red",
        fields: [
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
        {key: 'academic_body.name', label: 'Cuerpo Académico', sortable: true},
        {key: 'name', label: 'Nombre', sortable: true},
        {key: 'class', label: 'Clase', sortable: true},
        {key: 'type', label: 'Tipo', sortable: true},
        {key: 'range', label: 'Alcance', sortable: true},
        {key: 'finish_date', label: 'Fecha de fin', sortable: true},
        {key: 'leader.name', label: 'Líder', sortable: true}
    ];
    formSchemas = permission.hasPermissions();
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
}
