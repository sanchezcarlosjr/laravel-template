import { Component, Vue } from 'vue-property-decorator';
import VueFormGenerator from 'vue-form-generator';
import { lgac } from "../../@shared/repositories/academic_bodies/lgac/repository.ts";
import {Permission} from "../../@shared/application/auth/permission";

const schema = {
  legend: "LGAC",
  fields: [
    {
      type: 'input',
      inputType: 'text',
      label: 'Nombre de la LGAC*',
      model: 'name',
      required: true,
      validator: VueFormGenerator.validators.string.locale({
        fieldIsRequired: "Este campo es obligatorio"
      })
    },
    {
      type: 'input',
      inputType: 'text',
      label: 'Descripción',
      model: 'description'
    }
  ]
};

const permission = new Permission('/cuerpos-academicos/:academic_body_id/lgac', {
    create: schema,
    edit: schema
});

@Component
export default class LGACPage extends Vue {
  resource = lgac;
  criteria = [];
  fields = [
    {key: 'name', label: 'Nombre', sortable: true},
    {key: 'description', label: 'Descripción', sortable: true}
  ];
  formSchemas = permission.hasPermissions();
}
