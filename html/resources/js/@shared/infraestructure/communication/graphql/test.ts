import gql from 'graphql-tag';
import {DocumentNode} from "graphql";

function snake_case2PascalCase(str: string): string {
  return str.split("_").map(s => s[0].toUpperCase() + s.slice(1)).join("");
}

export interface QueryParams {
  vars?: {
    name: string,
    type: string
  }[],
  args?: {
    name: string,
    value: string
  }[],
  fields?: string[],
  paginated?: boolean,
  singular?: boolean,
  opname?: string,
  optype?: string
  suffix?: string
}

interface ResourceName {
  plural: string,
  singular: string
}

export function key2field (fields: any) {
  return fields.map((field: any) => field.key);
}

export default class GraphQLResourceRepository {
  private root: ResourceName;

  public constructor(root: ResourceName) {
    this.root = root;
  }

  public get resource() {
    return this.root
  }

  public all({
    paginated = true,
    singular = false
  }: QueryParams = {}) {
    let o = arguments[0] || {};
    o.paginated = paginated;
    o.singular = singular;
    o.opname = "all";
    return this._query(o);
  }

  public get({
    paginated = false,
    singular = true
  }: QueryParams = {}) {
    let o = arguments[0] || {};
    o.paginated = paginated;
    o.singular = singular;
    o.opname = "get";
    return this._query(o);
  }

  public upsert({
    paginated = false,
    singular = true,
    args = [
      {
        name: "data",
        value: "$data"
      }
    ],
    vars = []
  }: QueryParams = {}) {
    let o = arguments[0] || {};
    vars.push({
      name: "$data",
      type: snake_case2PascalCase(`upsert_${this.root.singular}_input`)
    });
    o.paginated = paginated;
    o.singular = singular;
    o.opname = "upsert";
    o.args = args;
    o.vars = vars;
    return this._mutate(o);
  }

  public create({
    paginated = false,
    singular = true,
    args = [
      {
        name: "data",
        value: "$data"
      }
    ],
    vars = []
  }: QueryParams = {}) {
    let o = arguments[0] || {};
    vars.push({
      name: "$data",
      type: snake_case2PascalCase(`create_${this.root.singular}_input`)
    });
    o.paginated = paginated;
    o.singular = singular;
    o.opname = "create";
    o.args = args;
    o.vars = vars;
    return this._mutate(o);
  }

  public update({
    paginated = false,
    singular = true,
    args = [
      {
        name: "data",
        value: "$data"
      }
    ],
    vars = []
  }: QueryParams = {}) {
    let o = arguments[0] || {};
    vars.push({
      name: "$data",
      type: snake_case2PascalCase(`update_${this.root.singular}_input`)
    });
    o.paginated = paginated;
    o.singular = singular;
    o.opname = "update";
    o.args = args;
    o.vars = vars;
    return this._mutate(o);
  }

  public destroy({
    paginated = false,
    singular = true,
    args = [
      {
        name: "id",
        value: "$id"
      }
    ],
    vars = []
  }: QueryParams = {}) {
    let o = arguments[0] || {};
    vars.push({
      name: "$id",
      type: "ID!"
    });
    o.paginated = paginated;
    o.singular = singular;
    o.opname = "destroy";
    o.args = args;
    o.vars = vars;
    return this._mutate(o);
  }

  public statistics({
    paginated = false,
    singular = true
  }: QueryParams = {}) {
    let o = arguments[0] || {};
    o.paginated = paginated;
    o.singular = singular;
    o.opname = "statistics";
    o.suffix = "_statistics"
    return this._query(o);
  }

  private _operation({
    vars = [],
    args = [],
    fields = ["id"],
    paginated = false,
    singular = true,
    optype = "",
    opname = "none",
    suffix = ""
  }:QueryParams): DocumentNode {
    let _args = args.map(a => `${a.name}:${a.value[0] === "$"?a.value:JSON.stringify(a.value)}`);
    let _vars = vars.map(v => `${v.name}:${v.type}`);
    return gql`${optype} ${opname}_${singular?this.root.singular:this.root.plural}${_vars.length > 0?"(":""}${_vars.join(", ")}${_vars.length > 0?")":""} {
      ${optype==="mutation"?`${opname}_`:""}${singular?this.root.singular:this.root.plural}${suffix}${_args.length > 0?"(":""}${_args.join(", ")}${_args.length > 0?")":""} {
        ${paginated?"data {":""}
          ${this._parseFields(fields)}
        ${paginated?"}":""}
      }
    }`;
  }

  private _query({
    args = [],
    fields = ["id"],
    paginated = false,
    singular = true
  }: QueryParams = {}) {
    let o = arguments[0] || {};
    o.optype = "query";
    return this._operation(o);
  }

  private _mutate({
    args = [],
    fields = ["id"],
    paginated = false,
    singular = true
  }: QueryParams = {}) {
    let o = arguments[0] || {};
    o.optype = "mutation";
    return this._operation(o);
  }

  private _parseFields(fields: string[]): string {
    let arr: string[] = [];
    fields.forEach(field => {
      arr.push(this._parseField(field));
    });
    return arr.join(",");
  }

  private _parseField(field: string): string {
    let split = field.split(".");
    if (split.length === 1) {
      return split[0];
    }
    let resource = split.shift();
    let subresource = split.join(".");
    /** Apollo throws a hissy fit if subresouces don't have ID's */
    return `${resource} {
      id
      ${this._parseField(subresource)}
    }`;
    /** TODO: Check if there's paginated sub-resources */
  }
}
