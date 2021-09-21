import {Component, Prop, Vue} from 'vue-property-decorator';
import GraphQLResourceRepository from "@shared/infraestructure/GraphQLResourceRepository";
import {DocumentNode} from "graphql";
import {Form} from "@shared/application/form/form";

@Component
export default class ApolloForm extends Vue {
    @Prop() schema!: Form;
    @Prop() resource!: GraphQLResourceRepository;
    model: any = {};
    public busy: boolean = false;
    private _idArg: any;
    private _fields: any[] = [];
    private _args: any[] = [];
    private _vars: any[] = [];

    updateModelQuery() {
        return this.resource.get({
            fields: this._fields,
            args: this._args,
            vars: this._vars
        });
    }

    beforeMount() {
        this._fields = this.schema.fields;
        this._idArg = {name: "id", value: -1};
        this._args = [this._idArg];
    }

    mounted() {
        /** Add Query for update/readings */
        this.$apollo.addSmartQuery("model", {
            query: this.updateModelQuery,
            update: data => {
                // Stuff that happens after update
                return data[this.resource.resource.singular]
            },
            fetchPolicy: "no-cache"
        });
        /** Pause it until needed */
        this.$apollo.queries.model.skip = true;

        this.$watch('$apollo.loading', () => {
            this.busy = this.$apollo.loading;
        });
    }

    get(id: number) {
        this._idArg.value = id;
        this.$apollo.queries.model.skip = false;
        this.$apollo.queries.model.refresh();
    }

    public async submit({
                            addRouteParams = true
                        }: { addRouteParams?: boolean } = {}) {
        /** Set as Busy */
        this.busy = true;

        /** Apollo model returns __typename. */
        /** However none of our input models accept it; therefore goodbye */
        delete this.model.__typename;
        this.schema.inject(this.model);
        if (addRouteParams) {
            /** Add Route Params */
            Object.keys(this.$route.params).forEach((key: string) => {
                this.model[key] = this.$route.params[key];
            });
        }
        /** Attempt to mutate */
        let result = await this.$apollo.mutate(this.factoryMutationEvent()).catch((error: any) => {
            /** Failure */
            this.$bvToast.toast(`Compruebe los datos.`, {
                title: 'Problemas en la operación',
                variant: 'danger',
                solid: true
            })
        });

        if (result !== undefined) {
            /** Successfully added */
            /** Toast */
            this.$bvToast.toast(`Su operación fue exitosa`, {
                title: 'Operación exitosa',
                variant: 'success',
                solid: true
            });
        }
        /** Unset Busy */
        this.busy = false;

        return result;
    }

    reset() {
        this._idArg.value = -1;
        this.$apollo.queries.model.skip = true;
        this.model = this.schema.defaultModel();


        /**
         if (this.model === null) {
      this.get(-1);
    } else {
      this.$apollo.queries.model.refetch();
    }
         */
    }

    async validate() {
        // block form
        //@ts-ignore
        if (await this.$refs.form.validate()) {
            // afterValidation();
            return true;
        } else {
            return false;
        }
    }

    private factoryMutationEvent(): { mutation: DocumentNode, variables: any } {
        return this.schema.mutate(this.resource, this.model);
    }
}
