import {Component, Vue} from 'vue-property-decorator';
import {members} from "../../@shared/repositories/academic_bodies/members/repository.ts";
import {
    campus,
    close_to_retirement,
    gender,
    leaders,
    members as members_criteria
} from "../../@shared/search-criteria/search-criteria.ts";
import {Permission} from "../../@shared/application/auth/permission";

export const membersForm = {
    legend: "Empleado",
    fields: [
        {
            type: 'label',
            label: 'Nombre',
            model: 'name'
        },
        {
            type: 'label',
            label: 'Correo electrónico',
            model: 'correo1'
        },
        {
            type: 'label',
            label: 'Edad',
            model: 'age'
        },
        {
            type: 'label',
            label: 'Unidad Académica',
            model: 'academic_unit.name'
        },
        {
            type: 'label',
            label: 'Sexo',
            model: 'sexo'
        },
        {
            type: 'label',
            label: 'Grado',
            model: 'grado'
        },
        {
            type: 'label',
            label: '¿Es PTC?',
            model: 'is_ptc',
            get: (employee: { is_ptc: boolean }) => (employee && employee.is_ptc) ? "Sí" : "No"
        },
        {
            type: "label",
            label: "¿Es un perfil PRODEP activo?",
            model: "has_active_prodep_profile",
            get: (employee: { has_active_prodep_profile: boolean }) => (employee && employee.has_active_prodep_profile) ? "Sí" : "No"
        },
        {
            type: 'label',
            label: '¿Es un SNI activo?',
            model: 'has_active_sni',
            get: (employee: { has_active_sni: boolean }) => (employee && employee.has_active_sni) ? "Sí" : "No"
        },
        {
            type: 'label',
            label: '¿Es un profesor-investigador?',
            model: 'is_researcher',
            get: (employee: { is_researcher: boolean }) => (employee && employee.is_researcher) ? "Sí" : "No"
        }
    ]
};

const permission = new Permission('/cuerpos-academicos/miembros', {
    read: membersForm
});


@Component
export default class MembersPage extends Vue {
    resource = members;
    criteria = [
        members_criteria,
        leaders,
        gender,
        close_to_retirement,
        campus
    ];
    formSchemas = permission.hasPermissions();
    fields = [
        {key: 'is_leader', sortable: true},
        {key: 'name', label: 'Nombre', sortable: true, class: "vw-20"},
        {key: 'academic_unit.name', label: 'Unidad Académica', sortable: true},
        {key: 'academic_body.name', label: 'Cuerpos Académicos', sortable: true},
        {key: 'has_active_sni', label: 'SNI', sortable: true},
        {key: 'has_active_prodep_profile', label: 'PRODEP', sortable: true},
        {key: 'grado', label: 'Grado', sortable: true}
    ];

    rowClass = (employee: { is_leader: boolean }) => {
        return employee?.is_leader ? 'font-weight-bold' : '';
    };
}
