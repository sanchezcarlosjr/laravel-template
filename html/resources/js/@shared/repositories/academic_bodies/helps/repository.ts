import GraphQLResourceRepository from "@shared/infraestructure/GraphQLResourceRepository";

export const helps = new GraphQLResourceRepository(
  {
    singular: "help",
    plural: "helps"
  }
);
