<template>
    <b-table
        id="statistics-table"
        ref="table"
        :busy="busy"
        :fields="fields"
        :items="items"
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
    >
        <template #table-busy>
            <b-skeleton-table
                :columns="3"
                :rows="3"
            ></b-skeleton-table>
        </template>
    </b-table>
</template>

<script>
export default {
    name: "table-statistics.presenter",
    props: ["busy", "fields", "items"]
}
</script>
