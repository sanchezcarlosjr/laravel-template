import gql from "graphql-tag";
import {GraphqlSubResourceFinderRepository} from "./graphql-sub-resource-finder-repository";
import {camelize, toSingular} from "../GraphQL";


export class GraphqlResourceFinderRepository extends GraphqlSubResourceFinderRepository {

    static createDefaultFinder(query: string) {
        const resource = toSingular(`${query}`);
        return new GraphqlResourceFinderRepository(
            query,
            '',
            camelize(`update ${resource}`),
            camelize(`create ${resource}`),
            camelize(`update ${resource} input`),
            camelize(`create ${resource} input`)
        );
    }

    public query() {
        return gql`
            query getResourceById($id: ID) {
                ${this._query}(id: $id) {
                id
                ${this.fields}
            }
            }`;
    }


    update(data: any) {
        return data[this._query];
    }
}
