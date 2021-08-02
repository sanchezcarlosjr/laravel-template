import { Component, Mixins } from 'vue-property-decorator';
import VueFormGenerator from 'vue-form-generator';

@Component
export default class VFGFieldRubro extends Mixins(VueFormGenerator.abstractField) {
  public schema: any;
  private items: any = [];
  private value: any = {};

  private get fields() {
    return [
      {key: "name", label: "Nombre", class:"vw-40"},
      {key: "authorized", label: "Aceptado"},
      {key: "amount", label: "Monto", class: "vw-20"}
    ]
  }

  public get total() {
    return this.items.reduce((acc: Number, curr: { amount: Number })=>Number(acc) + Number(curr.amount), 0);
  }

  beforeMount() {
    this.items = this.schema.rubros.map((item: any)=>{
      return {
        name: item.nombre,
        authorized: false,
        amount: 0
      }
    });
    this.value = {
      create: this.items
    };
    // this.value = {
    //   rubros: this.items,
    //   total: this.total
    // };
    /** TODO: Generalize for Megarubros */
  }
}
