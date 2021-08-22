import {DocumentNode} from "graphql";

export interface ApolloRepository {
    query: () => DocumentNode;
    update: (data: any) => any;
}

export interface MutationRepository extends ApolloRepository {
    create: DocumentNode;
    edit: DocumentNode;
    remove: DocumentNode;
}

export interface SiipTableRepository extends MutationRepository {
    setFields: (fields: any[]) => void;
}
