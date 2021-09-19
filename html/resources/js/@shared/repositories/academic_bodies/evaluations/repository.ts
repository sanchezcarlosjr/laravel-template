import GraphQLResourceRepository from "@shared/infraestructure/GraphQLResourceRepository";

export const evaluations = new GraphQLResourceRepository(
  {
    singular: "evaluation",
    plural: "evaluations"
  }
);
