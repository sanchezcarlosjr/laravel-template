import GraphQLResourceRepository from "../../../infraestructure/communication/graphql/test";

export const networks = new GraphQLResourceRepository(
  {
    singular: "network",
    plural: "networks"
  }
);
