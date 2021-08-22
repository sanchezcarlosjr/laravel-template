<template>
    <div class="title">
        {{ name }}
    </div>
</template>

<script>
export default {
    name: "siip-title",
    data() {
        return {
            name: ''
        }
    },
    mounted() {
        let routes = this.$route.matched;
        this.name = routes.slice(routes.length - 1)[0].name;
    }
}
</script>

<style scoped>
.title {
    padding: 0 1rem 0 0.7rem;
}
</style>
