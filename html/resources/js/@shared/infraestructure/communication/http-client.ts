import axios from "axios";

export class HttpClient {

    get(url: string) {
        return axios.get(url).then((response) => response.data);
    }

    post(url: string, body: any) {
        return axios({
            url: url,
            method: 'post',
            data: {
                ...body
            }
        }).then((response) => response.data);
    }

    delete(url: string) {
        return axios({
            url: url,
            method: 'delete'
        }).then((response) => response.data);
    }

    put(url: string, body: any) {
        return axios.put(url, {
            ...body
        }).then((response) => response.data);
    }
}
