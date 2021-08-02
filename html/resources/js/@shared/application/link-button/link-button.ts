import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LinkButton extends Vue {
  @Prop({ default: "" }) route!: string;
  @Prop({ default: "link" }) icon!: string;

  private get text() {
    return this.route.split("/").pop();
  }
}
