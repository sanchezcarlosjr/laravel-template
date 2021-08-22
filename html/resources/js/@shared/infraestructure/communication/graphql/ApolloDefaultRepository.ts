import {DocumentNode} from "graphql";

export abstract class ApolloDefaultRepository {
    protected constructor(protected resourceName: string) {
    }

    query(): () => DocumentNode {
        const I = this;
        return function () {
            // @ts-ignore
            this[I.resourceName].setFields(I.mapFieldsToQuery(this));
            // @ts-ignore
            return this[I.resourceName].query();
        };
    }

    abstract mapFieldsToQuery(component: any): string[];

    update(): (data: any) => DocumentNode {
        const I = this;
        return function (data: any) {
            // @ts-ignore
            return I.mapDataToUpdate(this[I.resourceName].update(data), this);
        }
    }

    mapDataToUpdate(data: any, component: any) {
        return data;
    }
}
