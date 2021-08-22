import {ApolloSiipTableRepository} from "./graphql";
import {ApolloDefaultRepository} from "./ApolloDefaultRepository";

export function adapt(repository: ApolloDefaultRepository = new ApolloSiipTableRepository()) {
    return {
        // @ts-ignore
        query: repository.query(),
        update: repository.update(),
        prefetch: false,
        variables(): any {
            return {
                // @ts-ignore
                id: this.$route.params.id
            }
        },
    };
}
