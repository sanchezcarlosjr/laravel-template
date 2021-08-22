import {Component, Prop, Ref, Vue} from 'vue-property-decorator';
import TablePresenter from './application/table-presenter.component.vue';
import SearcherComponent from './application/searcher.component.vue';
import SiipTitle from './application/title.component.vue';
import PrintOptions from "./application/print-options.component.vue";
import GraphQLResourceRepository from "../../@shared/infraestructure/communication/graphql/test";
import FormModal from "../../@shared/application/form-modal/form-modal.component.vue";
import {FormType} from "../application/form-type";

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
  @Prop({default: ()=>[]}) filter!: any[]; //ToDo Type

   selectedFilters: any[] = []; //ToDo Type
  private _routeArgs: any[] = [];

  @Prop() fields!: any[]; // Table Fields
  _fields: string[] = []; // Query Fields
  @Prop() formSchemas!: any; //ToDo Type

  /** Literally form options */
  formOptions = {
      validateAsync: true,
      validateAfterLoad: false,
      validateAfterChanged: true
  };

  //@ts-ignore
  @Ref(FormType.Create) createForm!: Vue & {
    fetch: (id: number)=>void;
  }
  //@ts-ignore
  @Ref(FormType.Read) readForm!: Vue & {
    fetch: (id: number)=>void;
  }
  //@ts-ignore
  @Ref(FormType.Update) updateForm!: Vue & {
    fetch: (id: number)=>void;
  }
  /** Workaround */
  private FormModal = FormModal;

  /** Filter by field.visible & label */
  tableFields: {}[] = this.fields.filter((field) => {
    return (field.label !== undefined && (field.visible??true))
  });

  /** Used in Members */
  @Prop() rowClass: ((response: any) => string) | undefined;

  /** Used in Academic Bodies */
  @Prop() links!: Object;

  /** Bound to Apollo */
  items: any = [];
  /** Diff */

  /** Table Presenter Stuff */
  /** TODO: Check */
  criteria: string[] = [];
  sortBy = '';
  sortDesc = false;
  sortDirection = 'asc';
  options: any[] = [];

  /** Charts */
  isVisibleChart = false;

  //[x: string]: any; //bruh

  /** Methods */
  beforeMount() {
    /** Initialize Filters */
    this.selectedFilters = [];

    /** Get Route Params to filter by scope */
    this._routeArgs = Object.keys(this.$route.params).map((key: string) =>{
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

    this.runQueryParams();

    /** Push options for context menu */
    this.options = this.generateOptions();
  }

  /** Redirect Query Params */
  private runQueryParams() {
    let queries = Object.keys(this.$route.query);
    switch(true) {
      //@ts-ignore
      case queries.includes(FormType.Create): this.showModal(FormType.Create); return;
      //@ts-ignore
      case queries.includes(FormType.Read): this._showAndFetch(FormType.Read, this.$route.query[FormType.Read]); return;
      //@ts-ignore
      case queries.includes(FormType.Update): this._showAndFetch(FormType.Update, this.$route.query[FormType.Update]); return;
      //@ts-ignore
      case queries.includes(FormType.Delete): this._showAndFetch(FormType.Delete, this.$route.query[FormType.Delete]); return;
      //@ts-ignore
      case queries.includes(FormType.Archive): this._showAndFetch(FormType.Archive, this.$route.query[FormType.Archive]); return;
    }
  }

  /** Charts */
  get chartIcon() {
      return this.isVisibleChart ? ['fas', 'chevron-up'] : ['fas', 'chevron-down'];
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

  /** Search */
  public filterItems(filters: {criteria:any[], terms:any[]}) {
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
        if (this.formSchemas.hasOwnProperty(FormType.Update)) {
            this._showAndFetch(FormType.Update, item.id);
        } else if (this.formSchemas.hasOwnProperty(FormType.Read)) {
            this._showAndFetch(FormType.Read, item.id);
        } else {
            //@ts-ignore
            this.$router.push(this.links.edit.link.replace("*", item.id));
        }
    } catch(e) {
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
  onMutateSuccess(item: any, type: string) {
    if (type === "create") {
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

  /** Used for Edit & reads */
  private _showAndFetch(type: string, itemId: string) {
    this.showModal(type);
    //@ts-ignore
    this.$refs[type].fetch(itemId);
  }

  /** WIP */
  updateCache(item: any) {
    /** Not done yet lol */
    return;
    //@ts-ignore
    let query = this.$apollo.queries.items.options.query;
    let cache = this.$apollo.getClient().cache;

    const data = cache.readQuery({ query: query });
    //@ts-ignore
    data.items.push(item);
    cache.writeQuery({ query: query, data })
  }

  /** Options Generator */
  /** Where to Generate? */
  private generateOptions() {
    let options: {click: string, name: string}[] = [];

    Object.keys(this.formSchemas).forEach(form => {
      /** Doesn't make sense lol */
      // //@ts-ignore
      // if (form === FormType.Create) {
      //   options.push({
      //     //@ts-ignore
      //     click: FormType.Create,
      //     //@ts-ignore
      //     name: this.generateOptionsText("plus-square", this.$refs[FormType.Create].title)
      //   });
      // }
      if (form === FormType.Read) {
        options.push({
          //@ts-ignore
          click: FormType.Read,
          //@ts-ignore
          name: this.generateOptionsText("info-circle", this.$refs[FormType.Read].title)
        });
      }
      //@ts-ignore
      if (form === FormType.Update) {
        options.push({
          //@ts-ignore
          click: FormType.Update,
          //@ts-ignore
          name: this.generateOptionsText("edit", this.$refs[FormType.Update].title)
        });
      }
      //@ts-ignore
      if (form === FormType.Delete) {
        options.push({
          //@ts-ignore
          click: FormType.Delete,
          //@ts-ignore
          name: this.generateOptionsText("trash", this.$refs[FormType.Delete].title)
        });
      }
      //@ts-ignore
      if (form === FormType.Archive) {
        options.push({
          //@ts-ignore
          click: FormType.Archive,
          //@ts-ignore
          name: this.generateOptionsText("archive", this.$refs[FormType.Archive].title)
        });
      }
    });
    return options;
  }

  private generateOptionsText(icon: string, text: string) {
    /** TODO: Think harder lmao */
    return `<a>
                  <i class="fas fa-${icon}"></i>
                   ${text}
           </a>`;
  }

  /** Context Menu Option Handler */
  optionClicked(event: any) {
    let target = event.option.click;
    let id = event.item.row.id;

    this.$router.replace(`?${target}=${id}`).catch(error => {
      if (error.name != "NavigationDuplicated") {
        throw error;
      }
    });;
    this.runQueryParams();
  }
}
