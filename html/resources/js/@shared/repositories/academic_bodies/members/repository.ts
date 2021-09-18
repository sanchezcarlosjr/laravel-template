import GraphQLResourceRepository from "../../../infraestructure/test";

export const members = new GraphQLResourceRepository(
  {
    singular: "member",
    plural: "members"
  }
);
