<template>
    <b-dropdown
        v-b-tooltip.hover
        no-caret
        title="Filtros"
        toggle-class="text-decoration-none"
        variant="secondary-link"
    >
        <template #button-content>
          <b-button class="text-muted b-0" size="sm" variant="outline-light">
            <i class="fas fa-search"/>
              Buscar
          </b-button>
        </template>
        <b-dropdown-form style="width: 500px">
          <b-input-group>
            <b-form-tags
              v-model="terms"
              addButtonText="Añadir"
              input-id="tags-pills"
              placeholder="Añadir filtro"
              remove-on-delete
              tag-pills
              tag-variant="primary"
            />
          </b-input-group>
          <template v-for="category in categories">
            <b-form-checkbox-group v-model="criteria">
              <template v-for="option in category.criteria">
                <b-form-checkbox v-bind:value="option.value" @change="validate(category, option.value)">{{ option.value }}</b-form-checkbox>
              </template>
            </b-form-checkbox-group>
          </template>
        </b-dropdown-form>
    </b-dropdown>
</template>

<script>
export default {
    name: "searcher",
    props: ['filters'],
    data() {
        return {
            terms: [],
            categories: [],
            criteria: []
        }
    },
    mounted() {
      this.filters.forEach((category) => {
        this.categories.push(category);
        category.criteria.forEach((option) => {
          if (option.default === true) {
            this.criteria.push(option.value);
          }
        });
      });
      this.$emit("update", this.pack());
      this.$watch('terms', () => {
        this.$emit("update", this.pack());
      }, {deep: true});
    },
    methods: {
      pack() {
        return {
          criteria: this.categories.reduce((arr, category) => {
            if (category.type === "or") {
              let items = category.criteria.reduce((abb, option) => {
                if (this.criteria.includes(option.value)) {
                  abb.push(option.value);
                }
                return abb;
              }, []);
              if (items.length > 0) {
                arr.push({
                  name: category.model,
                  value: items
                });
              }
            }
            if (category.type === "xor") {
              let item = category.criteria.find(option => this.criteria.includes(option.value));
              if (item !== undefined) {
                arr.push({
                  name: category.model,
                  value: item.value
                });
              }
            }
            return arr;
          }, []),
          terms: {
            name: "terms",
            value: this.terms
          }
        };
      },
      validate(category, value) {
        if (category.type === "xor") {
          /** Remove overlap on Checkboxes */
          this.criteria = this.criteria.filter((v) => {
            return (!category.criteria.some(x => x.value === v) || v === value);
          });
        }
        this.$emit("update", this.pack());
      }
    }
}
</script>

<style scoped>

</style>
