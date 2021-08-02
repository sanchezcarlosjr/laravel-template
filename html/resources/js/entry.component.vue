<template>
    <router-view></router-view>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

@Component
export default class EntryComponent extends Vue {
    mounted() {
        console.log('%c Interested in working with us?\n See https://www.sanchezcarlosjr.com', 'background: #222; color: #bada55');
    }
}
</script>
