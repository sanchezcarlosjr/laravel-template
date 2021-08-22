import GraphQLResourceRepository from "../../../infraestructure/communication/graphql/test";

export const collaborators = new GraphQLResourceRepository(
  {
    singular: "collaborator",
    plural: "collaborators"
  }
);
