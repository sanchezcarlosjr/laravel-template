import GraphQLResourceRepository from "../../../infraestructure/test";

export const helps = new GraphQLResourceRepository(
  {
    singular: "help",
    plural: "helps"
  }
);
