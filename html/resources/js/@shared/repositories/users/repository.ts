import GraphQLResourceRepository from "@shared/infraestructure/GraphQLResourceRepository";

export const users = new GraphQLResourceRepository(
    {
        singular: "user",
        plural: "users"
    }
);
