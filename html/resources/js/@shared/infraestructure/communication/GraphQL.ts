import {AxiosResponse} from "axios";
import {HttpClient} from "./http-client";
import {Http} from "./http";

export function isObject(obj: any) {
    return Object.prototype.toString.call(obj) === '[object Object]' && obj.constructor.name === 'Object';
}

function createGqlQuery(obj: any): string {
    let shape = [];
    obj['id'] = '';
    for (let [key, val] of Object.entries(obj))
        shape.push(isObject(val) ? `${key} { ${createGqlQuery(val)} }` : key);

    return shape.join(' ');
}

function toType(value: any): string {
    return isNaN(Number(value)) ? `"${value}"` : value;
}

function makeGraphqlParameters(model: any): string {
    let params = '';
    Object.keys(model).forEach((field) => {
        const value = toType(model[field]);
        console.log(value);
        if (typeof value !== "undefined") {
            params = params.concat(`${field}: ${value},`)
        }
    });
    return params;
}

function unflatten(data: any) {
    const result: any = {};
    for (const i in data) {
        const keys = i.split('.');
        keys.reduce(function (r: any, e: any, j: any) {
            return r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 == j ? data[i] : {}) : [])
        }, result)
    }
    return result;
}

export function toGraphQL(request: { key: string }) {
    return createGqlQuery(unflatten({[`${request.key}`]: ''}));
}

export function toSingular(t: string) {
    return t.replace(/ies/, 'y').replace(/s /, '').replace(/_/g, '_');
}

export function camelize(str: string, replaceValue = '') {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, replaceValue);
}


export function upperCamelize(str: string, replaceValue = '') {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return word.toUpperCase();
    }).replace(/[-\s]+/g, replaceValue);
}

export interface GraphQLIndexResponse {
    resourceName?: string;
    items: any[];
    isASubResource?: boolean;
}

export class GraphQLBuilder<T> implements Http<T> {
    private readonly url: string = `${process.env.BASE_URL}graphql`;
    private httpClient = new HttpClient();
    private isASubResource = this.resource.indexOf('(') !== -1;
    private isAResource = false;
    private subCollection = '';
    private resourceGraphQL = this.resource.split('(')[0];
    private type: string = '';

    constructor(private resource: string, private fields: { sortable: boolean, key: string }[], private fatherID?: string) {
    }

    post(body: any) {
        return this.httpClient.post(this.url, body);
    }

    remove(id: string) {
        return this.post({
            query: `
                    mutation {
                        ${camelize(`Update ${this.resource}`)}(id: ${id}) {
                            id
                        }
                      }
                  `
        }) as Promise<T>;
    }

    find(id: string) {
        const query = this.toSingular();
        return this.post({
            query: `
                    query {
                        ${query}(id: ${id}) {
                          ${this.fields.filter((field) => field.sortable).map((field) => toGraphQL(field)).join('\n')}
                        }
                    }
                  `
        }).then((response) => response.data[query]);

    }

    update(id: string = 'update', body: any) {
        return this.store(body, id);
    }

    store(model: any, type = 'create') {
        this.type = type;
        const mutation = this.generateParameters();
        this.isAResource = true;
        return this.post({
            query: `
                    mutation {
                        ${mutation}${this.parameters(model)} ${this.generateRequest(model)}
                    }
                  `
        }).then((response) => {
            console.log(response);
            this.isAResource = false;
            if (this.isAEditableResource()) {
                return {
                    [`${this.fields[0].key.split('.')[0]}`]: response.data.data[mutation]
                }
            }
            return response.data[mutation];
        });
    }

    index(subCollection = 'active'): Promise<any> {
        this.subCollection = subCollection;
        return this.post({
            query: `query GetElementsToTable {
                     ${this.generateRequest()}
          }`
        }).then((response) => {
            console.log(response);
            this.mapToDataframeIfSubResource(response, this.resourceGraphQL);
            return {
                resourceName: this.isASubResource ? response.data[this.resourceGraphQL].name.toLowerCase() : '',
                isASubResource: this.isASubResource,
                items: response.data[this.resourceGraphQL].data
            }
        })
    }

    generateRequest(model?: any) {
        if (this.isAEditableResource()) {
            return ` {
              ${createGqlQuery(model)}
            }
            `;
        }
        if (this.isAResource) {
            return ` {
                            id
                            name
                            ${this.subCollection}
                            ${this.fields.filter((field) => field.sortable).map((field) => toGraphQL(field))}
                    }
        `
        }
        if (this.isASubResource) {
            return ` ${this.resource} {
                            id
                            name
                            ${this.subCollection}
                            ${this.fields.filter((field) => field.sortable).map((field) => toGraphQL(field))}
                    }
        `
        }
        return `${this.resource} {
                          data {
                            id
                            ${this.subCollection}
                            ${this.fields.filter((field) => field.sortable).map((field) => toGraphQL(field))}
                          }
       }
      `
    }

    private toSingular(resourceGraphQL: string = this.resourceGraphQL) {
        return toSingular(resourceGraphQL);
    }

    private isAEditableResource() {
        return (this.type == 'create' || this.type == 'update') && this.fatherID;
    }

    private parameters(model: any) {
        if (this.type == 'create' && this.fatherID) {
            return `(${makeGraphqlParameters({
                [`${this.resourceGraphQL}_id`]: this.fatherID,
                ...model
            })})`;
        }
        return `(${makeGraphqlParameters(model)})`;
    }

    private generateParameters(): string {
        if (this.isAEditableResource()) {
            return camelize(`${this.type}  ${this.fields[0].key.split('.')[0]}`).replace(/ies/, 'y').replace(/s/, '');
        }
        return camelize(`${this.type} ${this.resourceGraphQL.replace(/_/g, ' ')}`);
    }

    private mapToDataframeIfSubResource(response: AxiosResponse, resourceGraphQL: string) {
        if (this.isASubResource) {
            response.data[resourceGraphQL].data = [];
            Object.keys(response.data[resourceGraphQL]).filter((key) => Array.isArray(response.data[resourceGraphQL][key])).forEach((key) => {
                if (key === 'data') {
                    return;
                }
                const map = response.data[resourceGraphQL][key].map((value: any) => {
                    return {
                        [`${key}`]: {
                            ...value
                        }
                    }
                });
                response.data[resourceGraphQL].data = response.data[resourceGraphQL].data.concat(map);
            });
        }
    }
}

export function flattenObj(obj: any, parent: any, res: any = {}) {
    for (let key in obj) {
        let propName = key;
        if (typeof obj[key] == 'object') {
            flattenObj(obj[key], propName, res);
        } else {
            res[`${propName}`] = obj[key];
        }
    }
    return res;
}
