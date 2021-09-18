import GraphQLResourceRepository from "../../infraestructure/test";

export const academic_bodies = new GraphQLResourceRepository(
  {
    singular: "academic_body",
    plural: "academic_bodies"
  }
);
export const des = new GraphQLResourceRepository(
  {
    singular: "des",
    plural: "des_all"
  }
);
