import GraphQLResourceRepository from "../../../infraestructure/communication/graphql/test";

export const helps = new GraphQLResourceRepository(
  {
    singular: "help",
    plural: "helps"
  }
);
