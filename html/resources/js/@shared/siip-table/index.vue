<template>
    <div class="w-100 m-0">
        <div class="b-0" style="padding: 1rem 1.25rem 1rem 1.25rem;">
            <b-container class="card-title p-0">
                <b-row align-h="between">
                    <b-col cols="6" style="padding: 0">
                        <siip-title/>
                    </b-col>
                    <b-col cols="5">
                        <b-button-group class="float-right">
                            <searcher-component
                                :filters="filter"
                                @update="filterItems"
                            />
                            <print-options
                                :fields="fields"
                                :items="items"
                            />
                            <b-button
                                v-if="this.$scopedSlots.statistics"
                                v-b-tooltip.hover
                                :title="isVisibleChart ? 'Ocultar gráfico' : 'Mostrar  gráfico'"
                                size="sm"
                                variant="link-secondary"
                                @click="toggleChart"
                            >
                                <font-awesome-icon :icon="chartIcon" class="text-muted"></font-awesome-icon>
                            </b-button>
                            <b-button
                                v-if="crudSchema.canBeCreate"
                                v-b-tooltip.hover
                                :title="`Añadir ${resource.resource.singular}`"
                                class="b-0"
                                size="sm"
                                squared
                                variant="outline-success"
                                @click="showModal(crudSchema.creator.ref)"
                            >
                                +Nuevo
                            </b-button>
                        </b-button-group>
                    </b-col>
                </b-row>
                <b-row v-if="isVisibleChart">
                    <slot name="statistics" v-bind:filters="selectedFilters"/>
                </b-row>
            </b-container>
        </div>
        <table-presenter
            :busy="$apollo.loading"
            :fields="tableFields"
            :filter="criteria"
            :filter-function="search"
            :items="items"
            :rowClass="rowClass"
            :rowContextLinks="links"
            :rowContextOptions="options"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            @optionClicked="optionClicked"
            @rowClicked="onRowClick"
        />
        <!-- CREATE -->
        <form-modal
            v-if="crudSchema.canBeCreate"
            :ref="crudSchema.creator.ref"
            :resource="resource"
            :schema="crudSchema.creator"
            @mutate-success="onMutateSuccess"
        />
        <!-- READ -->
        <form-modal
            v-if="crudSchema.canBeRead"
            :ref="crudSchema.reader.ref"
            :resource="resource"
            :schema="crudSchema.reader"
        />
        <!-- EDIT -->
        <form-modal
            v-if="crudSchema.canBeUpdate"
            :ref="crudSchema.updater.ref"
            :resource="resource"
            :schema="crudSchema.updater"
            @mutate-success="onMutateSuccess"
        />
        <!-- DELETE -->
        <form-modal
            v-if="crudSchema.canBeDestroy"
            :ref="crudSchema.destroyer.ref"
            :resource="resource"
            :schema="crudSchema.destroyer"
            @mutate-success="onMutateSuccess"
        />
        <!-- TODO: ARCHIVE -->
    </div>
</template>

<script lang="ts" src="./siip-table.component.ts"></script>
<style lang="scss" scoped src="./siip-table.component.scss"></style>
