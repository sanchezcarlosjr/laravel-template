import GraphQLResourceRepository from "../../../infraestructure/test";

export const collaborators = new GraphQLResourceRepository(
  {
    singular: "collaborator",
    plural: "collaborators"
  }
);
