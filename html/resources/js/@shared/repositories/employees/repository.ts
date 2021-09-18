import GraphQLResourceRepository from "../../infraestructure/test";

export const employees = new GraphQLResourceRepository(
  {
    singular: "employee",
    plural: "employees"
  }
);
