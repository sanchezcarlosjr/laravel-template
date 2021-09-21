import {Form} from "@shared/application/form/form";
import {Mutation} from "@shared/application/form/mutation";
import {FormType} from "@shared/application/form/form-type";

export abstract class FormModalSchemaBuilder extends Form {
    private readonly defaultSize = "md";

    protected constructor(mutation: Mutation, private userInterfaceAttributes: {
        id: FormType | string,
        okTitle: string,
        prefixTitle: string,
        icon: string
    }, private _hideFooter: boolean = false) {
        super(mutation);
    }

    get okTitle(): string {
        return this.userInterfaceAttributes.okTitle;
    }

    get hideFooter(): boolean {
        return this._hideFooter;
    }

    get ref() {
        return this.getID();
    }

    get size() {
        return this._schema.size ?? this.defaultSize;
    }

    getID(): FormType | string {
        return this.userInterfaceAttributes.id;
    }

    getContextualOption() {
        return {
            click: this.getID(),
            name: `<a>
                    <i class="fas fa-${this.userInterfaceAttributes.icon}"></i>
                        ${this.getTitle()}
                  </a>`
        }
    }

    setLegend(legend: string) {
        this._schema.legend = legend;
    }

    getTitle(legend?: string) {
        return `${this.userInterfaceAttributes.prefixTitle} ${this._schema.legend}`;
    }

}
