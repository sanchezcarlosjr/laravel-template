import Vue from "vue"
import Component from "vue-class-component"

@Component
export default class PermissionsPage extends Vue {
    fields = ['Rol', 'MAS' ];
    items = [
        { isActive: true, Rol: 'Admnistrador', MAS: 'a' },
        { isActive: false, Rol: 'Coordinador general', MAS: 'b'},
        { isActive: false, Rol: 'Auxiliar CA', MAS: 'd' },
        { isActive: true, Rol: 'Jefe de departamento', MAS: 'c' }
    ];
}

