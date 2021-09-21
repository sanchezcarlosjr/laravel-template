import {Component, Prop, Ref, Vue} from 'vue-property-decorator';
import TablePresenter from './application/table-presenter.component.vue';
import SearcherComponent from './application/searcher.component.vue';
import SiipTitle from './application/title.component.vue';
import PrintOptions from "./application/print-options.component.vue";
import GraphQLResourceRepository from "@shared/infraestructure/GraphQLResourceRepository";
import FormModal from "@shared/application/form-modal/form-modal.component.vue";
import {CRUDSchemaBuilder} from "@shared/application/CRUDSchema";
import {FormType} from "@shared/application/form/form-type";
import {FormModalSchemaBuilder} from "@shared/application/form-modal-schema-builder";

@Component({
    components: {
        SearcherComponent,
        SiipTitle,
        TablePresenter,
        PrintOptions,
        FormModal
    }
})
export default class SiipTableComponent extends Vue {
    @Prop() resource!: GraphQLResourceRepository;
    @Prop({default: () => []}) filter!: any[]; //ToDo Type

    selectedFilters: any[] = []; //ToDo Type
    @Prop() fields!: any[]; // Table Fields
    _fields: string[] = []; // Query Fields
    @Prop() crudSchema!: CRUDSchemaBuilder;
    /** Literally form options */
    formOptions = {
        validateAsync: true,
        validateAfterLoad: false,
        validateAfterChanged: true
    };
    //@ts-ignore
    @Ref(FormType.Create) createForm!: Vue & {
        fetch: (id: number) => void;
    }
    //@ts-ignore
    @Ref(FormType.Read) readForm!: Vue & {
        fetch: (id: number) => void;
    }
    //@ts-ignore
    @Ref(FormType.Update) updateForm!: Vue & {
        fetch: (id: number) => void;
    }
    /** Filter by field.visible & label */
    tableFields: {}[] = this.fields.filter((field) => {
        return (field.label !== undefined && (field.visible ?? true))
    });
    /** Used in Members */
    @Prop() rowClass: ((response: any) => string) | undefined;
    /** Used in Academic Bodies */
    @Prop() links!: Object;
    /** Bound to Apollo */
    items: any = [];
    /** Table Presenter Stuff */
    /** TODO: Check */
    criteria: string[] = [];
    sortBy = '';
    /** Diff */
    sortDesc = false;
    sortDirection = 'asc';
    options: any[] = [];
    /** Charts */
    isVisibleChart = false;
    private _routeArgs: any[] = [];
    /** Workaround */
    private FormModal = FormModal;

    //[x: string]: any; //bruh

    /** Charts */
    get chartIcon() {
        return this.isVisibleChart ? ['fas', 'chevron-up'] : ['fas', 'chevron-down'];
    }

    /** Methods */
    beforeMount() {
        /** Initialize Filters */
        this.selectedFilters = [];

        /** Get Route Params to filter by scope */
        this._routeArgs = Object.keys(this.$route.params).map((key: string) => {
            return {
                name: key,
                value: this.$route.params[key]
            }
        });

        /** Get keys from fields */
        this._fields = this.fields.map((field: any) => field.key);

        /** Add ID */
        this._fields.push("id");

        /** Initialize Items Query */
        this.$apollo.addSmartQuery("items", {
            query: this._updateItemsQuery,
            update: data => data[this.resource.resource.plural].data
        });

        /** Pause Query, wait for search component */
        this.$apollo.queries.items.skip = true;
    }

    mounted() {
        /** Search component should be mounted by now */
        /** filterItems() should run once to update default query filters */

        /** Unpause Query */
        this.$apollo.queries.items.skip = false;

        /** Open modal by query params */
        this.runQueryParams();

        /** Push options for context menu */
        this.options = this.crudSchema.getOptions();
    }

    /** Search */
    public filterItems(filters: { criteria: any[], terms: any[] }) {
        let args = [filters.terms];
        filters.criteria.map(criteria => args.push(criteria));

        /** Update Filters in Repository */
        this.selectedFilters = args;

        /** Refresh Query */
        this.$apollo.queries.items.refresh();
        /**
         * Apparently Apollo calls the query twice:
         * https://github.com/vuejs/vue-apollo/discussions/492
         * This is intended behaviour for cache or something idk
         */
    }

    /** Table */
    onRowClick(item: any, index: number, button: any) {
        try {
            if (this.crudSchema.canBeUpdate) {
                this._showAndFetch(FormType.Update, item.id);
            } else if (this.crudSchema.canBeRead) {
                this._showAndFetch(FormType.Read, item.id);
            } else {
                //@ts-ignore
                this.$router.push(this.links.edit.link.replace("*", item.id));
            }
        } catch (e) {
        }
    }

    /** Todo: */
    search(row: any, criteria: string[]) {
        const values: string[] = Object.values(row);
        const valueString = values.toString();
        return criteria.filter(value => {
            return valueString.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        }).length > 0;
    }

    /** Listeners */
    onMutateSuccess(item: any, type: FormModalSchemaBuilder) {
        if (type.ref == FormType.Create) {
            this.$emit("created-element", item);
        }
        /** Refresh Table */
        this.$apollo.queries.items.refetch();
    }

    /** Modals */
    /** Used for Create */
    showModal(type: string) {
        this.$root.$emit('bv::show::modal', type);
    }

    /** WIP */
    updateCache(item: any) {
        /** Not done yet lol */
        return;
        //@ts-ignore
        let query = this.$apollo.queries.items.options.query;
        let cache = this.$apollo.getClient().cache;

        const data = cache.readQuery({query: query});
        //@ts-ignore
        data.items.push(item);
        cache.writeQuery({query: query, data})
    }

    /** Context Menu Option Handler */
    optionClicked(event: any) {
        let target = event.option.click;
        let id = event.item.row.id;

        this.$router.replace(`?${target}=${id}`).catch(error => {
            if (error.name != "NavigationDuplicated") {
                throw error;
            }
        });

        this.runQueryParams();
    }

    /** Redirect Query Params */
    private runQueryParams() {
        let queries = Object.keys(this.$route.query);
        switch (true) {
            //@ts-ignore
            case queries.includes(FormType.Create):
                this.showModal(FormType.Create);
                return;
            case queries.includes(FormType.Read):
                //@ts-ignore
                this._showAndFetch(FormType.Read, this.$route.query[FormType.Read]);
                return;
            case queries.includes(FormType.Update):
                //@ts-ignore
                this._showAndFetch(FormType.Update, this.$route.query[FormType.Update]);
                return;
            case queries.includes(FormType.Destroy):
                //@ts-ignore
                this._showAndFetch(FormType.Destroy, this.$route.query[FormType.Destroy]);
                return;
            case queries.includes(FormType.Archive):
                //@ts-ignore
                this._showAndFetch(FormType.Archive, this.$route.query[FormType.Archive]);
                return;
        }
    }

    private toggleChart() {
        this.isVisibleChart = !this.isVisibleChart;
    }

    /** Apollo Queries */
    private _updateItemsQuery() {
        return this.resource.all({
            fields: this._fields,
            args: this.selectedFilters.concat(this._routeArgs),
            vars: []
        });
    }

    /** Used for Edit & reads */
    private _showAndFetch(type: string, itemId: string) {
        this.showModal(type);
        //@ts-ignore
        this.$refs[type].fetch(itemId);
    }

}
