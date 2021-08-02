import {Http} from "./http";
import {HttpClient} from "./http-client";

export class Rest<T> extends HttpClient implements Http<T> {
    protected readonly url = `${process.env.BASE_URL}api/${this.resource}`;

    constructor(private resource: string) {
        super();
    }

    index() {
        return this.get(this.url).then((response) => {
            return {
                items: response
            }
        });
    }

    remove(id: string): Promise<T> {
        return this.delete(this.url);
    }

    store(body: any): Promise<T> {
        return this.post(this.url, body);
    }

    update(id: string, body: any): Promise<T> {
        return this.put(`${this.url}/${id}`, body);
    }
}
