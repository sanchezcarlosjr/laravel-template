<template>
    <router-view></router-view>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

@Component
export default class EntryComponent extends Vue {
    mounted() {
        console.log('%c Are you interested in working with us?\n Send me a message on https://www.sanchezcarlosjr.com (I\'m Carlos Eduardo Sanchez Torres, an UABC Alumni)', 'background: #222; color: #bada55');
    }
}
</script>
