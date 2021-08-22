import {MutationRepository} from "./siipTableRepository";
import gql from "graphql-tag";
import {camelize, toSingular} from "../GraphQL";


export class GraphqlSubResourceFinderRepository implements MutationRepository {
    protected fields: string[] | undefined;

    constructor(
        protected _query: string,
        protected _sub_query: string,
        protected editMutate?: string,
        protected createMutate?: string,
        protected updateInput?: string,
        protected createInput?: string,
        protected fragment: { index: string } = {
            index: ''
        },
        protected removeMutate?: string,
        protected removeInput?: string,
        protected resource?: string,
        public map?: (item: any, route: any) => any) {
    }

    public get edit() {
        return gql`
            mutation editResource($data: ${this.updateInput}) {
                ${this.editMutate} (data: $data) {
                id
            }
            }
        `;
    }

    public get foreign_key() {
        return `${this._query}_id`;
    }

    public get create() {
        return gql`
            mutation editResource($data: ${this.createInput}) {
                ${this.createMutate} (data: $data) {
                id
            }
            }
        `
    }

    public get remove() {
        return gql`
            mutation removeResource($data: ${this.removeInput}!) {
                ${this.removeMutate} (data: $data) {
                id
            }
            }
        `;
    }

    static createDefaultFinder(query: string, sub_query: string, map?: (item: any, route: any) => any) {
        const resource = toSingular(`${sub_query} `);
        return new GraphqlSubResourceFinderRepository(
            query,
            sub_query,
            camelize(`update ${resource}`),
            camelize(`create ${resource}`),
            camelize(`update ${resource} input`),
            camelize(`create ${resource} input`),
            undefined,
            camelize(`destroy ${resource}`),
            camelize(`destroy ${resource} input`),
            resource,
            map
        );
    }

    public setFields(fields: string[]) {
        this.fields = fields;
    }

    public query() {
        return gql`
            query getResourceById($id: ID) {
                ${this._query}(id: $id) {
                id
                ${this._sub_query} {
                id
                ${this.fields}
            }
            }
            }`;
    }

    public find(id: string, fields: string[]) {
        return gql`
            query findResourceById {
                ${this.resource}(id: ${id}) {
                id
                ${fields}
            }
            }
        `;
    }

    public updateByFind(data: any) {
        // @ts-ignore
        return data[this.resource];
    }

    update(data: any) {
        return data[this._query][this._sub_query];
    }
}
