<template>
    <b-breadcrumb :items="items"></b-breadcrumb>
</template>

<script>
import gql from "graphql-tag";

export default {
    apollo: {
        lazyTitleLoading: {
            query: gql`
                query getResourceById($id: ID) {
                  academic_body(id:$id) {
                    id
                    name
                    prodep_key
                  }
                }
            `,
            manual: true,
            result({data, loading}) {
                if (data['academic_body'] && !loading) {
                    this.items[this.lazyItem.index].text = `${data['academic_body'].prodep_key} ${data['academic_body'].name}`;
                }
            },
            variables() {
                return {
                    id: this.$route.params.academic_body_id || 0
                }
            }
        }
    },
    data() {
        return {
            items: [],
            lazyItem: {index: 0, query: 0},
        }
    },
    mounted() {
        this.loadBreadcrumb(this.$route.matched);
    },
    watch: {
        '$route.matched': 'loadBreadcrumb'
    },
    methods: {
        loadBreadcrumb(routes) {
            if (routes.length === 0) {
                return;
            }
            routes = routes.slice(1);
            this.items = [];
            let lazy = false;
            const paths = this.$route.fullPath.split('/').slice(1);
            let path = `/${paths[0]}`;
            routes.forEach((route, index) => {
                    if (route.props?.default?.queryName) {
                        this.lazyItem.index = index;
                        lazy = true;
                    }
                    this.items.push({
                        text: route.name || 'Cargando...',
                        to: {path: path}
                    })
                    path += `/${paths[index + 1]}`;
                }
            );
            if (lazy) {
                this.$apollo.queries.lazyTitleLoading.refetch();
            }
        }
    }
}
</script>
