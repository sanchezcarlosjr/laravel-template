import { Component, Vue } from 'vue-property-decorator';
import VueFormGenerator from 'vue-form-generator';
import { helps } from "../../@shared/repositories/academic_bodies/helps/repository.ts";
import {Permission} from "../../store/auth/permission";

const permission = new Permission('/cuerpos-academicos/apoyos', {
    read: {
        legend: "Apoyo",
        fields: [
            {
                type: 'label',
                label: 'Tipo de apoyo',
                model: 'type_name'
            },
            {
                type: 'label',
                label: 'Fecha',
                model: 'date'
            },
            {
                type: 'label',
                label: 'Monto',
                model: 'amount'
            },
            {
                type: 'label',
                label: 'Empleado beneficiado',
                model: "beneficiary.name"
            },
            {
                type: "link",
                label: "Liberación",
                model: "release_url",
                visible: (model: { release_url: string }) => !!model?.release_url
            },
            {
                type: "link",
                label: "Reporte",
                model: "report_url",
                visible: (model: { report_url: string }) => !!model?.report_url
            }
        ]
    }
});

@Component
export default class HelpsPage extends Vue {
  resource = helps;
  criteria = [];
  fields = [
    {key: 'type_name', label: 'Tipo', sortable: true},
    {key: 'date', label: 'Fecha', sortable: true},
    {key: 'amount', label: 'Cantidad', sortable: true},
    {key: 'benefited_employee.name', label: 'Beneficiario', sortable: true},
    {key: 'academic_body.name', label: 'Cuerpos académicos', sortable: true},
    {key: 'academic_body.leader.academic_unit.name', label: 'Unidad académica', sortable: true},
    {key: 'academic_body.leader.academic_unit.campus', label: 'Campus', sortable: true},
  ];
  formSchemas = permission.hasPermissions();
}
