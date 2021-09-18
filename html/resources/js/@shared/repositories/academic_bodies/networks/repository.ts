import GraphQLResourceRepository from "../../../infraestructure/test";

export const networks = new GraphQLResourceRepository(
  {
    singular: "network",
    plural: "networks"
  }
);
