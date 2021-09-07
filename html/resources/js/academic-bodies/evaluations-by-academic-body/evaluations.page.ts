import {Component, Vue} from 'vue-property-decorator';
import {grade} from "@shared/search-criteria/search-criteria.ts";
import {evaluations} from "@shared/repositories/academic_bodies/evaluations/repository.ts";
import {Permission} from "@shared/application/auth/permission";


const schema = {
    legend: "Evaluación",
    fields: [
        {
            type: 'select',
            label: 'Grado*',
            model: 'grade',
            selectOptions: {
                noneSelectedText: "Seleccione un tipo"
            },
            values: [
                {
                    name: "En formación",
                    id: "0"
                },
                {
                    name: "En consolidación",
                    id: "1"
                },
                {
                    name: "Consolidado",
                    id: "2"
                }
            ],
            validator: (value: string) => {
                let errors = [];
                if (!value) {
                    errors.push("Selecciona una opción");
                }
                if (parseInt(value) > 2 || parseInt(value) < 0) {
                    errors.push("Opción desconocida");
                }
                return errors;
            }
        },
        {
            type: 'calendar',
            inputType: 'text',
            label: 'Vigente desde',
            model: 'start_date'
        },
        {
            type: 'input',
            inputType: 'number',
            label: 'Años de vigencia',
            min: 5,
            max: 7,
            model: 'years_to_finish',
            default: 5
        },
    ]
};

const permission = new Permission('/cuerpos-academicos/:academic_body_id/evaluaciones',
    {
        create: schema,
        edit: schema,
        destroy: {
            legend: schema.legend,
            fields: [
                {
                    type: "label",
                    label: "¿Desea eliminar esta evaluación?",
                    hint: "Acción irreversible.",
                    model: "grade_name"
                }
            ]
        },
    }
);

@Component
export default class EvaluationsPage extends Vue {
    resource = evaluations;
    criteria = [grade];
    formSchemas = permission.hasPermissions();
    fields = [
        {key: 'grade_name', label: 'Grado', sortable: true},
        {key: 'start_date', label: 'Vigente desde', sortable: true, class: 'vw-5'},
        {key: 'finish_date', label: 'Vigencia hasta', sortable: true, class: 'vw-5'}
    ];
}
