import { Component, Mixins } from 'vue-property-decorator';
import VueFormGenerator from "vue-form-generator";

enum State {
  Empty,
  Loaded
}

@Component
export default class VfgFieldUpload extends Mixins(VueFormGenerator.abstractField) {
  private currentState: State = State.Empty;
  private route: string = "";
  private file: File|null = null;
  private State = State;
  private reference!: string;

  public value: any;
  public schema: any;
  public model: any;

  private get icon() {
    return "file-pdf";
  }

  private reset() {
    this.value = null;
    this.route = "";
    this.reference = this.schema.ref??this.schema.model.replace("_url", "");
    this.currentState = State.Empty;
    if (this.file !== null) {
      //@ts-ignore
      this.$refs["file-input"].reset();
    }
  }

  private swap() {
    /** Add reference to model */
    this.model[this.reference] = this.file;//??this.value;

    // let name = this.schema.model;
    // while(name in this.model) {
    //   /** Delete visual fetch from model */
    //   delete(this.model[name]);
    // }
  }

  beforeMount() {
    this.$watch("value", (value: string) => {
      this.route = value;
      this.swap();
      if (value) {
        this.currentState = State.Loaded;
      } else {
        this.currentState = State.Empty;
      }
    });

    /** Default default */
    if (this.schema.default === undefined) {
      this.schema.default = ()=>{
        this.reset();
      }
    }
  }

  mounted() {
    this.reset();
  }

  onRemoveClick(e: MouseEvent) {
    this.reset();
  }

  onFileChange(e: any) {
    this.swap();
  }
}
