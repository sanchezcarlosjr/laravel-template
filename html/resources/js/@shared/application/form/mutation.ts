import GraphQLResourceRepository from "@shared/infraestructure/GraphQLResourceRepository";
import {DocumentNode} from "graphql";

export abstract class Mutation {
    abstract mutate(resource: GraphQLResourceRepository, model: any): { mutation: DocumentNode, variables: any };
}
