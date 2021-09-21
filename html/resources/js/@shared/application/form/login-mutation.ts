import {Mutation} from "@shared/application/form/mutation";
import GraphQLResourceRepository from "@shared/infraestructure/GraphQLResourceRepository";
import {DocumentNode} from "graphql";

export class LoginMutation extends Mutation {
    mutate(resource: GraphQLResourceRepository, model: { email: string, password: string }): { mutation: DocumentNode; variables: any } {
        return {
            mutation: resource.get({
                fields: [
                    'id',
                    'current_access_token',
                    'permissions.module',
                    'permissions.create',
                    'permissions.edit',
                    'permissions.read',
                    'permissions.destroy',
                    'employee.name'
                ],
                args: [
                    {
                        name: "email",
                        value: "$email"
                    },
                    {
                        name: "password",
                        value: "$password"
                    }
                ],
                vars: [{
                    name: "$email",
                    type: "String!"
                }, {
                    name: "$password",
                    type: "String!"
                }]
            }),
            variables: {
                ...model
            }
        }
    }
}
