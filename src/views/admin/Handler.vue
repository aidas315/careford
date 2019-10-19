<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    computed: {
        authenticated() {
            return this.$store.getters.authenticated
        }
    },
    watch: {
        authenticated() {
            if (!this.authenticated) {
                this.$router.push({ name: 'home' })
            }
        }
    }
}
</script>