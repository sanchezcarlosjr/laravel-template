import GraphQLResourceRepository from "@shared/infraestructure/GraphQLResourceRepository";

export const members = new GraphQLResourceRepository(
  {
    singular: "member",
    plural: "members"
  }
);
