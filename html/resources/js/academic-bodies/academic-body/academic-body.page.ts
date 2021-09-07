import {Component, Ref, Vue} from 'vue-property-decorator';
import {schema} from "../academic-body-management/academic-body-management.page";
import {Permission} from "@shared/application/auth/permission";
import {academic_bodies} from "@shared/repositories/academic_bodies/repository";

@Component
export default class AcademicBodyPage extends Vue {
    @Ref() form!: Vue & {
        submit: ({}) => boolean;
        reset: () => void;
        get: (id: number) => void;
        validate: () => boolean;
        busy: boolean;
    }
    public busy: boolean = false;
    resource = academic_bodies;
    formSchemas = new Permission('/cuerpos-academicos', {
        'edit': schema
    }).hasPermissions();

    mounted() {
        this.form.get(Number(this.$route.params.academic_body_id));
        this.$watch('form.busy', () => {
            this.busy = this.form.busy;
        }, {deep: true});
    }

    save() {
        this.form.submit({
            addRouteParams: false
        });
    }
}
