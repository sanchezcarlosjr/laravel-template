import GraphQLResourceRepository from "../../../infraestructure/test";

export const evaluations = new GraphQLResourceRepository(
  {
    singular: "evaluation",
    plural: "evaluations"
  }
);
