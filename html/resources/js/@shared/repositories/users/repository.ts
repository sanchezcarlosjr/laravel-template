import GraphQLResourceRepository from "../../infraestructure/communication/graphql/test";

export const users = new GraphQLResourceRepository(
    {
        singular: "user",
        plural: "users"
    }
);
