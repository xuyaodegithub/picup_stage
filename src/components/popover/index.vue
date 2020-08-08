<template>
    <div class="popover">
        <component :is="popoverAlive.title"></component>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import vTags from './pointToUser/index'
    export default {
        name: "index",
        data() {
            return {}
        },
        components: {
            vTags
        },
        computed: {
            ...mapGetters( ['popoverAlive'] )
        },
        methods: {}
    }
</script>

<style scoped lang="scss">
.popover{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-60%);
    width: auto;
    height: auto;
    z-index: 1000;
}
</style>
