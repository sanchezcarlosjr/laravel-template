<template>
  <b-dropdown
    v-b-tooltip.hover
    no-caret
    toggle-class="text-decoration-none"
    variant="secondary-link"
    title="Opciones de impresión"
  >
    <template #button-content>
      <font-awesome-icon class="text-muted b-0" icon="file-download"/>
    </template>
    <b-dropdown-form class="content">
      Seleccione las columnas que desee
      <b-form-checkbox-group
        class="checkbox-list"
        v-model="selected"
        :options="options"
      />
      <div class="button-wrapper">
        <a v-b-tooltip.hover class="pointer text-muted" title="Descargar como CSV" @click="printCSV">
          <font-awesome-icon icon="file-csv"/>
        </a>
        <a v-b-tooltip.hover class="pointer text-muted" title="Descargar como PDF" @click="printPDF">
          <font-awesome-icon icon="file-pdf"/>
        </a>
      </div>
    </b-dropdown-form>
  </b-dropdown>
</template>

<script>
export default {
  data() {
    return {
      /** Array of Selected Columns */
      selected: [],
      /** Array of Available Columns */
      options: []
    }
  },
  props: [
    /** Reference to Apollo.items */
    "items",
    /** Create Selected & Options from Fields */
    "fields"
  ],
  methods: {
    test() {
      console.log(this.data);
    },
    _escapeForCSV(str) {
      if (str == null) {
        return '""';
      }
      return '"' + str.replaceAll('"','""') + '"';
    },
    printCSV() {
      let filteredFields = this.fields.filter(field => this.selected.includes(field.label));
      let file = [];

      let headers = [];
      filteredFields.forEach((field) => {
        /** Append Column Header */
        headers.push(this._escapeForCSV(field.label));
      });
      /** Append New Line */
      file.push(headers.join(",") + "\r\n");

      this.items.forEach((item)=>{
        let row = [];
        filteredFields.forEach((field) => {
          /** Inline access to resources & subresources */
          row.push(this._escapeForCSV(field.key.split(".").reduce((o, i)=> o?.[i], item)));
        });
        file.push(row.join(",") + "\r\n");
      })

      let blob = new Blob(["\uFEFF" + file.join("")], {
        type: "text/csv;charset=utf-8;"
      });
      let hiddenElement = document.createElement("a");
      hiddenElement.download = new Date().toISOString().slice(0, 10) + window.location.pathname.split("/").pop() + ".csv";
      hiddenElement.href = URL.createObjectURL(blob);
      hiddenElement.click();
    },
    printPDF() {
      let filteredFields = this.fields.filter(field => this.selected.includes(field.label));
      let table = document.createElement("table");

      {
        let header = table.createTHead();
        let row = header.insertRow();
        filteredFields.forEach((field) => {
          let cell = row.insertCell();
          cell.appendChild(document.createTextNode(field.label));
        });
      }
      {
        let body = table.createTBody();
        this.items.forEach((item)=>{
          let row = body.insertRow();
          filteredFields.forEach((field) => {
            let cell = row.insertCell();
            cell.appendChild(
              document.createTextNode(
                field.key.split(".").reduce(
                  (o, i)=> (o?.[i] === true?"SÍ":(o?.[i] === false?"NO":o?.[i]))
                , item)??""
              )
            );
          });
        })
      }
      let style = `
      <style type="text/css">
        th {
          font-weight: bold;
          text-align: center;
        }
        table, th, td {
          border-collapse: collapse;
          border: 1px solid #000;
          padding: 0.5em;
        }
      </style>
      `;
      let print = window.open('', 'PRINT', '');
      print.document.write('<html><head><title>' + document.title  + '</title>' + style + '</head><body>' + table.outerHTML + '</body></html>');
      print.document.close();
      print.focus();
      print.print();
      print.close();
    }
  },
  beforeMount() {
    this.fields.forEach((field) => {
      /** Field Labels into Options */
      if (field.label !== undefined) {
        this.options.push(field.label);
      }
      /** Set Visible as Default */
      if (field.visible??true) {
        this.selected.push(field.label);
      }
    });
  }
}
</script>

<style scoped>
.content {
  width: 30vw;
}

.checkbox-list {
  margin: 1rem 0rem;
}

.button-wrapper {
  text-align: center;
}

.button-wrapper a {
  margin: 0 1rem;
  font-size: 2rem;
}
</style>
