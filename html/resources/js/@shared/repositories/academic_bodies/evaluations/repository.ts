import GraphQLResourceRepository from "../../../infraestructure/communication/graphql/test";

export const evaluations = new GraphQLResourceRepository(
  {
    singular: "evaluation",
    plural: "evaluations"
  }
);
