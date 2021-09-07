import {Component, Vue} from 'vue-property-decorator';
import {campus, grade, validity} from "@shared/search-criteria/search-criteria";
import {academic_bodies} from "@shared/repositories/academic_bodies/repository";
import {Permission} from "@shared/application/auth/permission";

const permission = new Permission('/cuerpos-academicos/evaluaciones', {
    read: {
        legend: "Cuerpo Académico",
        fields: [
            {
                type: 'label',
                label: 'Nombre de Cuerpo Académico',
                model: 'name'
            },
            {
                type: 'label',
                label: 'Clave Prodep',
                model: 'prodep_key'
            },
            {
                type: 'label',
                label: 'Vigente',
                model: 'active',
                get: (academic_body: { active: boolean }) => academic_body ? (academic_body.active ? "Sí" : "No") : ""
            },
            {
                type: 'label',
                label: 'Área del conocimiento',
                model: 'prodep_area.name'
            },
            {
                type: 'label',
                label: 'Disciplina',
                model: 'discipline'
            },
            {
                type: 'label',
                label: 'DES',
                model: 'des.name'
            },
            {
                type: 'label',
                label: 'Grado',
                model: 'grade'
            }
            /** etc */
        ]
    }
});

@Component
export default class EvaluationsPage extends Vue {
    resource = academic_bodies;
    criteria = [validity, campus, grade];
    formSchemas = permission.hasPermissions();
    fields = [
        {key: 'name', label: 'Cuerpo académico', sortable: true, class: 'vw-20'},
        {key: 'last_evaluation.grade_name', label: 'Grado de consolidación', sortable: true},
        {key: 'last_evaluation.finish_date', label: 'Vigente hasta', sortable: true},
        {key: 'leader.academic_unit.name', label: 'Unidad académica', sortable: true},
        {key: 'leader.academic_unit.campus', label: 'Campus', sortable: true},
    ];
}
