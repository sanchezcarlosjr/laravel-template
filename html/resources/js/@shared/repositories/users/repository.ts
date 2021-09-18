import GraphQLResourceRepository from "../../infraestructure/test";

export const users = new GraphQLResourceRepository(
    {
        singular: "user",
        plural: "users"
    }
);
