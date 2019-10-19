<template>
    <b-jumbotron class="foot text-center">
        <p>&copy; {{ year }} {{ $root.title }} Corporation. All rights reserved.</p>
        <p>This project is developed by 
            <a href="https://github.com/aidas315" target="_blank">Aidas</a>, 
            <a href="https://github.com/AbdulRehmanMehar" target="_blank">Abdul Rehman</a>.
        </p>
    </b-jumbotron>
</template>

<script>
export default {
    data() {
        return {
            year: new Date().getFullYear()
        }
    }
}
</script>

<style scoped>
.foot {
    margin-top: 80px;
    margin-bottom: 0px;
}
</style>