import {ApolloDefaultRepository} from "./ApolloDefaultRepository";
import {DocumentNode} from "graphql";
import {toGraphQL} from "../GraphQL";

export class ApolloEditorRepository extends ApolloDefaultRepository {
    constructor() {
        super("resource");
    }

    query(): () => DocumentNode {
        const I = this;
        return function () {
            // @ts-ignore
            return this[I.resourceName].find(this.itemId || 0, I.mapFieldsToQuery(this));
        };
    }

    update(): (data: any) => DocumentNode {
        const I = this;
        return function (data: any) {
            // @ts-ignore
            return I.mapDataToUpdate(this[I.resourceName].updateByFind(data), this);
        }
    }

    mapFieldsToQuery(component: any) {
        const schema = component.schema;
        const fields: {type: string, fragment: string, model: string, ignoreResponseField?: boolean }[] = schema.fieldsToFind || schema.fields;
        return fields.map((field) => {
            if (field.type == "array") {
                return field?.fragment;
            }
            return field.ignoreResponseField ? "" : toGraphQL({key: field.model});
        });
    }
}
