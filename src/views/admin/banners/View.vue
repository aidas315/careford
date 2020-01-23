<template>
    <b-container>
        <br><br><br>
        <b-card no-body>
            <template v-slot:header>
                <p class="mb-0" style="float: left">View Banners</p>
                <b-link :to="{name: 'add_banner'}" style="float: right">Add Banner   </b-link>
            </template>
            <b-card-body>
                <table class="table stripped hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Link</th>
                            <th colspan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(banner, index) in banners" :key="index">
                            <td>{{ ++index }}</td>
                            <td>
                                {{ banner.title }}
                            </td>
                            <td>
                                <a :href="banner.link" target="_blank">{{ banner.link }}</a>
                            </td>
                            <td>
                                <!-- <router-link :to="{name: 'edit_banner', params: {id: banner.id}}">Edit</router-link> -->
                            </td>
                            <td>
                                <a href="#" @click.prevent="deleteBanner($event, banner.id)">Delete</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-card-body>
        </b-card>
    </b-container>
</template>

<script>
export default {
    computed: {
        banners() {
            return this.$store.getters.banners
        },
    },
    methods: {
        deleteBanner($evnet, id) {
            this.$store.dispatch('delete_banner', id)
        },
    }
}
</script>