import Vue from "vue";
import Component from "vue-class-component";
import {GraphqlResourceRepository} from "../../@shared/infraestructure/communication/graphql/graphql-resource-repository";

@Component
export default class ResearcherPage extends Vue {
    tableTitle = "Gestión profesor-investigador";
    apiResource = GraphqlResourceRepository.createDefaultRepository('researchers');
    spanishResourceName = "investigador";
    toolbar = new Set(["add"]);
    schema = {
        fields: [
            {
                type: 'input',
                inputType: 'text',
                label: 'Nombre',
                model: 'name'
            }
        ]
    };
    fields = [
        {key: "employee.name", label: "Beneficiario", sortable: true},
        {key: "employee.academic_unit.name", label: "Unidad académica", sortable: true},
        {key: "valid", label: "Fecha de otorgamiento", sortable: true},
        {key: "probative", label: "Probatorio", sortable: true}
    ];
}
