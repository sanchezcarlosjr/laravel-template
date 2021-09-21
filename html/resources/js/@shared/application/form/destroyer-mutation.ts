import {Mutation} from "@shared/application/form/mutation";
import GraphQLResourceRepository from "@shared/infraestructure/GraphQLResourceRepository";
import {DocumentNode} from "graphql";

export class DestroyerMutation extends Mutation {
    mutate(resource: GraphQLResourceRepository, model: { id: string | number }): { mutation: DocumentNode; variables: any } {
        return {
            mutation: resource.destroy(),
            variables: {
                id: model.id
            }
        };
    }
}
