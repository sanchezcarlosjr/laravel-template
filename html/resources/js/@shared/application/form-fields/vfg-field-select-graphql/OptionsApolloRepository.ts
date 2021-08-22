import {ApolloDefaultRepository} from "../../../infraestructure/communication/graphql/ApolloDefaultRepository";

export class OptionsApolloRepository extends ApolloDefaultRepository {
    constructor() {
        super('optionsFinder');
    }

    mapFieldsToQuery(component: any): string[] {
        return [component.schema.textKey];
    }

    mapDataToUpdate(data: any[], component: any) {
        return data.map(
            (result: any) => {
                return {
                    value: result.id,
                    text: result[component.schema.textKey]
                }
            });
    }
}
