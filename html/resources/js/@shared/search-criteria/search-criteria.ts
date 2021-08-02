export const validity = {
    type: "xor",
    model: "validity",
    criteria: [
        {
            value: "Vigente",
            default: true
        },
        {
            value: "No Vigente"
        }
    ]
}
export const campus = {
    type: "xor",
    model: "campus",
    criteria: [
        {
            value: 'Mexicali'
        },
        {
            value: 'Ensenada'
        },
        {
            value: 'Tijuana'
        }
    ]
}
export const gender = {
    type: "xor",
    model: "gender",
    criteria: [
        {
            value: "Hombre"
        },
        {
            value: "Mujer"
        },
        {
            value: "NA"
        }
    ]
}
export const close_to_retirement = {
    type: "xor",
    model: "close_to_retirement",
    criteria: [{
        value: "Próximos a jubilarse"
    }]
}
export const close_to_expire = {
    type: "xor",
    model: "close_to_expire",
    criteria: [{
        value: "Próximos a vencer SNI"
    }]
}
export const grade = {
    type: "or",
    model: "grade",
    criteria: [
        {
            value: "En formación"
        },
        {
            value: "En consolidación"
        },
        {
            value: "Consolidado"
        }
    ]
}
export const leaders = {
    type: "xor",
    model: "leaders",
    criteria: [{
        value: "Líder"
    }]
}
export const members = {
    type: "xor",
    model: "members",
    criteria: [
        {
            value: "Miembros",
            default: true
        },
        {
            value: "No miembros"
        }
    ]
}
export const authorized = {
  type: "xor",
  model: "authorized",
  criteria: [
    {
      value: "Autorizado"
    },
    {
      value: "No autorizado"
    }
  ]
}
export const extended = {
  type: "xor",
  model: "extended",
  criteria: [
    {
      value: "Con prórroga"
    }
  ]
}
