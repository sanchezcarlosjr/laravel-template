import GraphQLResourceRepository from "@shared/infraestructure/GraphQLResourceRepository";

export const employees = new GraphQLResourceRepository(
  {
    singular: "employee",
    plural: "employees"
  }
);
