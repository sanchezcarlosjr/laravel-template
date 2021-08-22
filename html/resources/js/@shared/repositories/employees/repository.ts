import GraphQLResourceRepository from "../../infraestructure/communication/graphql/test";

export const employees = new GraphQLResourceRepository(
  {
    singular: "employee",
    plural: "employees"
  }
);
