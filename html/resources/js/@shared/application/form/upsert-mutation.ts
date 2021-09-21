import {Mutation} from "@shared/application/form/mutation";
import GraphQLResourceRepository from "@shared/infraestructure/GraphQLResourceRepository";
import {DocumentNode} from "graphql";

export class UpsertMutation extends Mutation {
    mutate(resource: GraphQLResourceRepository, model: any): { mutation: DocumentNode; variables: any } {
        return {
            mutation: resource.upsert(),
            variables: {
                data: {
                    ...model
                }
            }
        }
    }
}
