<template>
    <b-container class="p-0 m-0" fluid>
        <div class="b-table-sticky-header">
            <b-table
                id="main-table"
                ref="table"
                :busy="busy"
                :current-page="currentPage"
                :fields="fields"
                :filter="criteria"
                :filter-function="search"
                :items="items"
                :per-page="perPage"
                :tbody-tr-class="rowClass"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                empty-filtered-text="Sin resultados"
                emptyText="Sin elementos"
                head-variant="light"
                hover
                responsive
                show-empty
                small
                stacked="md"
                sticky-header
                striped
                @row-clicked="rowClicked"
                @row-contextmenu="rowContextMenu"
            >
                <template #table-busy>
                    <b-skeleton-table
                        :columns="fields.length"
                        :rows="3"
                    ></b-skeleton-table>
                </template>
                <template #cell()="data">
                    <div v-if="typeof data.value === 'boolean'">
                        <i v-if="data.value" class="fas fa-check" style="font-size: 12px"/>
                    </div>
                    <div v-else>
                        {{data.value}}
                    </div>
                </template>
            </b-table>
            <context-menu
                :ref="'contextMenu'"
                :elementId="'myFirstMenu'"
                :links="rowContextLinks"
                :options="rowContextOptions"
                @option-clicked="optionClicked"
            >
            </context-menu>
        </div>
        <b-container class="bv-example-row">
            <b-row align-h="between">
                <b-col cols="4">
                    <p>
                        <b-form-select id="perPageSelected" v-model="perPage" :options="[5, 10, 25]" class="mt-0 w-25"
                                       size="sm"></b-form-select>
                        resultados por página. {{rows}} resultados.
                    </p>
                </b-col>
                <b-col cols="4">
                    <b-pagination
                        v-model="currentPage"
                        :per-page="perPage"
                        :total-rows="rows"
                        aria-controls="main-table"
                        class="d-flex justify-content-end"
                    ></b-pagination>
                </b-col>
            </b-row>
        </b-container>
    </b-container>
</template>

<script>
export default {
    name: "table-presenter",
    props: [
        'busy',
        'items',
        'fields',
        'rowClass',
        'criteria',
        'search',
        'sortBy',
        'sortDesc',
        'sortDirection',
        'rowContextOptions',
        'rowContextLinks'
    ],
    data() {
        return {
            perPage: 10,
            currentPage: 1
        }
    },
    computed: {
        rows() {
            return this.items.length;
        }
    },
    methods: {
        rowClicked(item, index, event) {
            this.$emit('rowClicked', item, index, event);
        },
        rowContextMenu(item, index, event) {
            event.preventDefault();
            this.$refs.contextMenu.showMenu(event, {
                index,
                row: item
            });
        },
        optionClicked(event) {
            this.$emit('optionClicked', event);
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 100%;
}

.b-table-sticky-header {
    overflow-y: auto;
    max-height: 70vh;
}
</style>
