import {Rest} from "./Rest";
import {GraphQLBuilder} from "./GraphQL";
import {Http} from "./http";


export function communicationFactory<T>(name: string, ...resource: any[]): Http<T> | null {
    switch (name) {
        case 'REST':
            return new Rest<T>(resource[0]);
        case 'GraphQL':
            return new GraphQLBuilder<T>(resource[0], resource[1], resource[2]);
    }
    return null;
}
