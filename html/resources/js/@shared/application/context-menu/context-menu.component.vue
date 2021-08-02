<template>
    <div
        v-click-outside="onClickOutside"
        @contextmenu.prevent.stop=""
    >
        <b-list-group
            :id="elementId"
            class="vue-simple-context-menu"
        >
            <b-button-group v-if="links" tag="b-list-group-item">
                <router-link
                    v-for="(value, key) in links" :key="key"
                    v-b-tooltip.hover
                    :title="value.tooltip"
                    v-if="item"
                    :to="value.link.replace('*', item.row.id)"
                    class="pointer" tag="b-button"
                    varant="secondary">
                    <i class="fas" style="font-size:20px"
                       v-bind:class="'fa-'+key"></i>
                </router-link>
            </b-button-group>
            <b-list-group-item
                v-for="(option, index) in options"
                :key="index"
                @click.stop="optionClicked(option)"
                class="vue-simple-context-menu__item"
            >    <span v-html="option.name"></span></b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
import Vue from 'vue'
import vClickOutside from 'v-click-outside'

Vue.use(vClickOutside)

export default {
    name: 'VueSimpleContextMenu',
    props: {
        elementId: {
            type: String,
            required: true
        },
        links: {
            type: Object,
            required: false
        },
        options: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            item: null,
            menuWidth: null,
            menuHeight: null
        }
    },
    methods: {
        showMenu(event, item) {
            this.item = item;
            const menu = document.getElementById(this.elementId)
            if (!menu) {
                return
            }
            if (!this.menuWidth || !this.menuHeight) {
                menu.style.visibility = "hidden"
                menu.style.display = "block"
                this.menuWidth = menu.offsetWidth
                this.menuHeight = menu.offsetHeight
                menu.removeAttribute("style")
            }
            let extra = 0;
            if (this.menuHeight < 40) {
                extra = 80;
            }
            menu.style.left = event.layerX + 1 + "px";
            menu.style.top = event.layerY + this.menuHeight + extra + "px";
            menu.classList.add('vue-simple-context-menu--active')
        },
        hideContextMenu() {
            let element = document.getElementById(this.elementId)
            if (element) {
                element.classList.remove('vue-simple-context-menu--active');
            }
        },
        onClickOutside() {
            this.hideContextMenu()
        },
        optionClicked(option) {
            this.hideContextMenu();
            this.$emit('option-clicked', {
                item: this.item,
                option: option
            })
        },
        onEscKeyRelease(event) {
            if (event.keyCode === 27) {
                this.hideContextMenu();
            }
        }
    },
    mounted() {
        document.body.addEventListener('keyup', this.onEscKeyRelease);
    },
    beforeDestroy() {
        document.removeEventListener('keyup', this.onEscKeyRelease);
    }
}
</script>

<style lang="scss">

.vue-simple-context-menu {
    top: 0;
    z-index: 2;
    left: 0;
    margin: 0;
    padding: 0;
    display: none;
    list-style: none;
    position: absolute;

    &--active {
        display: block;
    }

    &__item {
        display: flex;
        cursor: pointer;
        padding: 5px 15px;
        align-items: center;

        &:hover {
            background-color: var(--secondary);
            color: var(--light);
        }
    }

    &__divider {
        box-sizing: content-box;
        height: 2px;
        padding: 4px 0;
        background-clip: content-box;
        pointer-events: none;
    }

    // Have to use the element so we can make use of `first-of-type` and
    // `last-of-type`
    li {
        &:first-of-type {
            margin-top: 4px;
        }

        &:last-of-type {
            margin-bottom: 4px;
        }
    }
}
</style>
