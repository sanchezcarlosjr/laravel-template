import {Component, Vue} from 'vue-property-decorator';
import VueFormGenerator from 'vue-form-generator';
import {validator as GraphQLSelectIdValidator} from "../../@shared/application/form-fields/vfg-field-select-graphql-id/vfg-field-select-graphql-id"

import {academic_bodies, des} from "../../@shared/repositories/academic_bodies/repository";
import {prodep_areas} from "../../@shared/repositories/prodep/repository";
import {campus, grade, validity} from "../../@shared/search-criteria/search-criteria";

import AcademicBodyStatistics from './statistics/index.vue';
import {Permission} from "../../store/auth/permission";

export const schema = {
    legend: "Cuerpo Académico",
    fields: [
        {
            type: "input",
            inputType: "text",
            label: "Nombre del cuerpo académico*",
            model: "name",
            required: true,
            validator: VueFormGenerator.validators.string.locale({
                fieldIsRequired: "Este campo es obligatorio"
            })
        },
        {
            type: "input",
            inputType: "text",
            label: 'Clave PRODEP*',
            model: 'prodep_key',
            required: true,
            validator: VueFormGenerator.validators.string.locale({
                fieldIsRequired: "Este campo es obligatorio"
            })
        },
        {
            type: "switch2",
            label: "Vigencia",
            model: "active",
            textOn: "Vigente",
            textOff: "No vigente"
        },
        {
            type: 'graphql-select-id',
            label: 'Área de conocimiento*',
            model: "prodep_area.name",
            query: {
                resource: prodep_areas,
                target: "name",
                ref: "prodep_area_id",
                scopes: [{
                    name: "name_like"
                }]
            },
            required: true,
            validator: GraphQLSelectIdValidator({
                selectValid: "Seleccione un área válida"
            })
        },
        {
            type: "input",
            inputType: "text",
            label: 'Disciplina*',
            model: 'discipline',
            required: true,
            validator: VueFormGenerator.validators.string.locale({
                fieldIsRequired: "Este campo es obligatorio"
            })
        },
        {
            type: 'graphql-select-id',
            label: 'DES*',
            model: "des.name",
            query: {
                resource: des,
                target: "name",
                ref: "des_id",
                scopes: [
                    {
                        name: "name_like"
                    }
                ]
            },
            required: true,
            validator: GraphQLSelectIdValidator({
                selectValid: "Seleccione un empleado válido"
            })
        }
    ]
};


@Component({
    components: {
        AcademicBodyStatistics
    }
})
export default class AcademicBodyManagementPage extends Vue {
    resource = academic_bodies;
    criteria = [
        validity,
        campus,
        grade
    ];
    links = {
        'edit': {
            link: '/cuerpos-academicos/*/detalles',
            tooltip: 'Detalles del cuerpo académico'
        },
        'project-diagram': {
            link: '/cuerpos-academicos/*/lgac',
            tooltip: 'LGAC'
        },
        'user-tie': {
            link: '/cuerpos-academicos/*/miembros',
            tooltip: 'Miembros'
        },
        'file-alt': {
            link: '/cuerpos-academicos/*/evaluaciones',
            tooltip: 'Evaluaciones'
        },
        'hand-holding-usd': {
            link: '/cuerpos-academicos/*/apoyos',
            tooltip: 'Apoyos'
        },
        'network-wired': {
            link: '/cuerpos-academicos/*/redes',
            tooltip: 'Redes'
        }
    };
    fields = [
        {key: 'name', label: 'Nombre', sortable: true, editable: true, class: 'vw-20'},
        {
            key: 'last_evaluation.grade_name',
            label: 'Grado de consolidación',
            sortable: true,
            editable: true,
            class: 'vw-5'
        },
        {key: 'prodep_key', label: 'Clave PRODEP', sortable: true, editable: true, class: 'vw-5'},
        {key: `leader.academic_unit.name`, label: 'Unidad Académica', sortable: true, editable: false},
        {key: 'discipline', label: 'Disciplina', sortable: true, editable: false, visible: false},
        {key: 'prodep_area.name', label: 'Area PRODEP', sortable: true, editable: false, visible: false}
    ];
    formSchemas = new Permission('/cuerpos-academicos', {
        create: schema
    }).hasPermissions();

    createdElement(item: any) {
        /** Todo: Abstract Item @ apollo form */
        this.$router.push(`/cuerpos-academicos/${item.data["upsert_academic_body"].id}/lgac?create`);
    };
}
