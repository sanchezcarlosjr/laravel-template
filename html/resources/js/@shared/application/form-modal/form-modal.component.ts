import {Component, Prop, Ref, Vue} from 'vue-property-decorator';
import GraphQLResourceRepository from "@shared/infraestructure/GraphQLResourceRepository";
import {FormModalSchemaBuilder} from "@shared/application/form-modal-schema-builder";

@Component
export default class FormModal extends Vue {
    @Prop() schema!: FormModalSchemaBuilder;
    @Prop() resource!: GraphQLResourceRepository;
    @Ref() form!: Vue & {
        submit: () => boolean;
        reset: () => void;
        get: (id: number) => void;
        validate: () => boolean;
        busy: boolean;
    }
    @Ref() modal!: any;
    busy: boolean = false;

    mounted() {
        this.$watch('form.busy', () => {
            this.busy = this.form.busy;
        }, {deep: true});
    }

    reset() {
        this.form.reset()
    }

    ok() {
        this.form.submit();
    }

    fetch(id: number) {
        /** Modal requires to be static in order for this to work */
        /** Otherwise, object is not mounted at call time */
        this.form.get(id);
    }

    private onHide(e: any) {
        if (e.trigger !== "ok") {
            this.form.reset();
        }
    }

    private async onOk(e: any) {
        e.preventDefault();
        if (await this.form.validate()) {
            let item = await this.form.submit();
            if (item !== undefined) {
                this.$emit("mutate-success", item, this.schema);
                this.modal.hide();
                this.reset();
            }
        }
    }
}
