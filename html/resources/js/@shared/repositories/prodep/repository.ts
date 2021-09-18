import GraphQLResourceRepository from "../../infraestructure/test";

export const prodep_profiles = new GraphQLResourceRepository(
  {
    singular: "prodep_profile",
    plural: "prodep_profiles"
  }
);
export const prodep_helps = new GraphQLResourceRepository(
  {
    singular: "prodep_help",
    plural: "prodep_helps"
  }
);
export const prodep_nptcs = new GraphQLResourceRepository(
  {
    singular: "prodep_nptc",
    plural: "prodep_nptcs"
  }
);
export const prodep_areas = new GraphQLResourceRepository(
  {
    singular: "prodep_area",
    plural: "prodep_areas"
  }
);
