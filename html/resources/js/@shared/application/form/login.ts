import {Form} from "@shared/application/form";
import {LoginMutation} from "@shared/application/login-mutation";
import {FormSchema} from "@shared/application/form-schema";

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
