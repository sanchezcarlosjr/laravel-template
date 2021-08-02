import GraphQLResourceRepository from "../../../infraestructure/communication/graphql/test";

export const lgac = new GraphQLResourceRepository(
  {
    singular: "lgac",
    plural: "lgacs"
  }
);
