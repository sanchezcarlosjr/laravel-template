import Vue from "vue";
import Component from "vue-class-component";
import {Permission} from "../store/auth/permission";
import {FieldTable} from "../@shared/siip-table/field-table";
import GraphQLResourceRepository from "../@shared/infraestructure/communication/graphql/test";

@Component
export default class EmployeesPage extends Vue {
    resource = new GraphQLResourceRepository(
        {
            singular: "employee2",
            plural: "employees2"
        }
    );
    fields: FieldTable[] = [
        {key: 'cvu', label: 'CVU', sortable: true, class: 'w-40'},
        {key: 'employee.name', label: 'Empleado', sortable: true},
    ];
    formSchemas = new Permission('/empleados', {
        read: {
            legend: "Empleado",
            fields: [
                {
                    type: 'label',
                    label: 'Nombre',
                    model: 'cvu'
                },
                {
                    type: 'label',
                    label: 'Nombre',
                    model: 'employee.correo1'
                }
            ]
        }
    }).hasPermissions();
}
