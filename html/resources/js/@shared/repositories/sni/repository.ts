import GraphQLResourceRepository from "../../infraestructure/communication/graphql/test";

export const sni_areas = new GraphQLResourceRepository(
    {
        singular: "sni_area",
        plural: "sni_areas"
    }
);

export const snis = new GraphQLResourceRepository(
    {
        singular: "sni",
        plural: "snis"
    }
);
