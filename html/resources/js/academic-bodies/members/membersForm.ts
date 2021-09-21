export const membersForm = {
    legend: "Empleado",
    fields: [
        {
            type: 'label',
            label: 'Nombre',
            model: 'name'
        },
        {
            type: 'label',
            label: 'Correo electrónico',
            model: 'correo1'
        },
        {
            type: 'label',
            label: 'Edad',
            model: 'age'
        },
        {
            type: 'label',
            label: 'Unidad Académica',
            model: 'academic_unit.name'
        },
        {
            type: 'label',
            label: 'Sexo',
            model: 'sexo'
        },
        {
            type: 'label',
            label: 'Grado',
            model: 'grado'
        },
        {
            type: 'label',
            label: '¿Es PTC?',
            model: 'is_ptc',
            get: (employee: { is_ptc: boolean }) => (employee && employee.is_ptc) ? "Sí" : "No"
        },
        {
            type: "label",
            label: "¿Es un perfil PRODEP activo?",
            model: "has_active_prodep_profile",
            get: (employee: { has_active_prodep_profile: boolean }) => (employee && employee.has_active_prodep_profile) ? "Sí" : "No"
        },
        {
            type: 'label',
            label: '¿Es un SNI activo?',
            model: 'has_active_sni',
            get: (employee: { has_active_sni: boolean }) => (employee && employee.has_active_sni) ? "Sí" : "No"
        },
        {
            type: 'label',
            label: '¿Es un profesor-investigador?',
            model: 'is_researcher',
            get: (employee: { is_researcher: boolean }) => (employee && employee.is_researcher) ? "Sí" : "No"
        }
    ]
};
