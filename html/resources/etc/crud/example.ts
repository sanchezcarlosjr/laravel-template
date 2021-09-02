import Vue from "vue";
import Component from "vue-class-component";
import GraphQLResourceRepository from "@shared/infraestructure/communication/graphql/test";
import {Permission} from "@shared/application/auth/permission";

const schema = {
    legend: "",
    fields: []
};

const formSchema = new Permission('', {
    edit: {},
    create: {}
});

@Component
export default class Example extends Vue {
    criteria = [];
    formSchemas = formSchema.hasPermissions();
    fields = [
        {key: '', label: '', sortable: true}
    ];
    resource = new GraphQLResourceRepository(
        {
            singular: "SINGULAR",
            plural: "PLURAL"
        }
    );
}
