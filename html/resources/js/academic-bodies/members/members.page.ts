import {Component, Vue} from 'vue-property-decorator';
import {members} from "@shared/repositories/academic_bodies/members/repository.ts";
import {
    campus,
    close_to_retirement,
    gender,
    leaders,
    members as members_criteria
} from "@shared/search-criteria/search-criteria.ts";
import {CRUDSchemaBuilder} from "@shared/application/form/CRUDSchema";
import {membersForm} from "./membersForm";

const builder = new CRUDSchemaBuilder('/cuerpos-academicos/miembros', {
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
    formSchemas = builder;
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
