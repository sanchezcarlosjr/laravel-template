import {Form} from "@shared/application/form/form";
import {LoginMutation} from "@shared/application/form/login-mutation";
import {FormSchema} from "@shared/application/form/form-schema";

export class Login extends Form {
    constructor() {
        super(new LoginMutation());
    }

    static instance(schema: FormSchema) {
        const login = new Login();
        login.schema = schema;
        return login;
    }
}
