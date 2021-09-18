require('./bootstrap');
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import Vue from 'vue';
import SiipBreadcrumb from './@shared/application/breadcrumb.component.vue';
import SiipTableComponent from "./@shared/siip-table/index.vue";
import VfgFieldCalendar from './@shared/application/form-fields/vfg-field-calendar/index.vue';
import VfgFieldEmail from './@shared/application/form-fields/vfg-field-email/index.vue';
import VfgFieldApiSelect from './@shared/application/form-fields/vfg-field-select-api/index.vue';
import VfgFieldUpload from './@shared/application/form-fields/vfg-field-upload/index.vue';
import VfgFieldSwitch from './@shared/application/form-fields/vfg-field-switch/index.vue';
import VfgFieldLink from './@shared/application/form-fields/vfg-field-link/vfg-field-link.vue';
import EntryComponent from './entry.component.vue';
import AcademicBodyLgacs from './academic-bodies/lgac-by-academic-body/index.vue';
import ContextMenu from './@shared/application/context-menu/context-menu.component.vue';
// @ts-ignore
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import apolloProvider from "./settings/apollo";
import router from './routes';
import VfgFieldGraphQLSelectID from './@shared/application/form-fields/vfg-field-select-graphql-id/index.vue';
import VfgFieldTags from './@shared/application/form-fields/vfg-field-tags/index.vue';
import VfgFieldArray from './@shared/application/form-fields/vfg-field-array/index.vue';
// @ts-ignore
import VueFormGenerator from "vue-form-generator/dist/vfg-core.js";

import ApolloForm from "./@shared/application/apollo-form/apollo-form.component.vue";
import FormModal from "./@shared/application/form-modal/form-modal.component.vue";
import LinkButton from "./@shared/application/link-button/link-button.component.vue";
import VfgFieldRubro from "./@shared/application/form-fields/vfg-field-rubro/vfg-field-rubro.component.vue";


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueFormGenerator);

Vue.component('entry-component', EntryComponent)
Vue.component('siip-table', SiipTableComponent);
Vue.component('siip-breadcrumb', SiipBreadcrumb)
Vue.component('field-calendar', VfgFieldCalendar);
Vue.component('field-switch2', VfgFieldSwitch);
Vue.component('field-api-select', VfgFieldApiSelect);
Vue.component('field-email', VfgFieldEmail);
Vue.component('field-upload2', VfgFieldUpload);
Vue.component('field-link', VfgFieldLink);
Vue.component('field-graphql-select-id', VfgFieldGraphQLSelectID)
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('context-menu', ContextMenu);
Vue.component('siip-academic-body-lgacs', AcademicBodyLgacs);
Vue.component('field-tags', VfgFieldTags);
Vue.component('field-array', VfgFieldArray);

Vue.component('apollo-form', ApolloForm);
Vue.component('form-modal', FormModal);
Vue.component('link-button', LinkButton);
Vue.component('field-rubro', VfgFieldRubro);

const app = new Vue({
    el: '#app',
    apolloProvider,
    router
});
