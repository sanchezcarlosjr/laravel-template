import GraphQLResourceRepository from "../../../infraestructure/communication/graphql/test";

export const members = new GraphQLResourceRepository(
  {
    singular: "member",
    plural: "members"
  }
);
