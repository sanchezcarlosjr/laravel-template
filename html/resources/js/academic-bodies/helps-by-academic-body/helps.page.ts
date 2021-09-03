import {Component, Vue} from 'vue-property-decorator';
import {validator as GraphQLSelectIdValidator} from "../../@shared/application/form-fields/vfg-field-select-graphql-id/vfg-field-select-graphql-id"
import {helps} from "../../@shared/repositories/academic_bodies/helps/repository.ts";
import {members} from "../../@shared/repositories/academic_bodies/members/repository.ts";
import {Permission} from "../../@shared/application/auth/permission";


@Component
export default class HelpsPage extends Vue {
    _schema = {
        legend: "Apoyo",
        fields: [
            {
                type: 'select',
                label: 'Tipo de apoyo',
                model: 'type',
                selectOptions: {
                    noneSelectedText: "Seleccione un tipo"
                },
                values: [
                    {
                        name: 'Estancias cortas',
                        id: "0"
                    },
                    {
                        name: 'Apoyo a publicación',
                        id: "1"
                    },
                    {
                        name: 'Convocatoria redes',
                        id: "2"
                    },
                    {
                        name: 'Convocatoria fortalecimiento de CA',
                        id: "3"
                    },
                    {
                        name: 'Becas posdoctorado',
                        id: "4"
                    }
                ]
            },
            {
                type: 'calendar',
                label: 'Fecha',
                model: 'date'
            },
            {
                type: 'input',
                inputType: 'number',
                label: 'Monto',
                model: 'amount'
            },
            {
                type: 'graphql-select-id',
                label: 'Empleado beneficiado',
                model: "beneficiary.name",
                query: {
                    resource: members,
                    target: "name",
                    ref: "benefited_employee_id",
                    scopes: [
                        {
                            name: "name_or_id"
                        },
                        {
                            name: "academic_body_id",
                            value: Number(this.$route.params.academic_body_id)
                        }
                    ]
                },
                required: true,
                hint: "Número de Empleado: ",
                validator: GraphQLSelectIdValidator({
                    selectValid: "Seleccione un empleado válido"
                })
            },
            {
                type: "upload2",
                label: 'Reporte',
                model: 'reporte_url'
            },
            {
                type: "upload2",
                label: 'Liberación',
                model: 'liberacion_url'
            }
        ]
    };
    resource = helps;
    criteria = [];
    fields = [
        {key: 'type_name', label: 'Tipo', sortable: true},
        {key: 'date', label: 'Fecha', sortable: true},
        {key: 'amount', label: 'Monto', sortable: true},
        {key: 'benefited_employee.name', label: 'Beneficiario', sortable: true},
        {key: 'benefited_employee.academic_unit.name', label: 'Unidad académica', sortable: true},
        {key: 'benefited_employee.academic_unit.campus', label: 'Campus', sortable: true}
    ];
    formSchemas = new Permission('/cuerpos-academicos/:academic_body_id/apoyos', {
        create: this._schema,
        edit: this._schema,
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
                    label: "Reporte",
                    model: "reporte_url",
                    visible: (model: { report_url: string }) => !!model?.report_url
                },
                {
                    type: "link",
                    label: "Liberación",
                    model: "liberacion_url",
                    visible: (model: { release_url: string }) => !!model?.release_url
                }
            ]
        }
    }).hasPermissions();
}
