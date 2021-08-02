import Vue from "vue";
import Component from "vue-class-component";
import {GraphqlSubResourceFinderRepository} from "../../@shared/infraestructure/communication/graphql/graphql-sub-resource-finder-repository";

@Component
export default class NetworksPage extends Vue {
    apiResource = GraphqlSubResourceFinderRepository.createDefaultFinder('academic_body', 'networks');
    spanishResourceName = 'red'
    toolbar = new Set<String>(['add', 'edit', 'remove']);
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
    schema = {
        fieldsToFind: [
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
                type: "link",
                label: "Formalización",
                model: "formation_url",
                visible: (model: any) => !!model?.formation_url
            },
            {
                type: "upload2",
                label: 'Nueva formalización',
                ignoreResponseField: true,
                model: 'formation'
            },
            {
                type: "array",
                label: "Colaboradores",
                model: "collaborators",
                ignoreResponseField: true,
                fragment: `
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
        ],
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
                model: 'formation'
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
    };
}
