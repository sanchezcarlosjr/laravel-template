import GraphQLResourceRepository from "@shared/infraestructure/GraphQLResourceRepository";

export const collaborators = new GraphQLResourceRepository(
  {
    singular: "collaborator",
    plural: "collaborators"
  }
);
