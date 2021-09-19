import GraphQLResourceRepository from "@shared/infraestructure/GraphQLResourceRepository";

export const networks = new GraphQLResourceRepository(
  {
    singular: "network",
    plural: "networks"
  }
);
