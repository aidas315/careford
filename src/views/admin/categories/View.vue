<template>
    <b-container>
        <br><br><br>
        <b-card no-body>
            <template v-slot:header>
                <p class="mb-0" style="float: left">View Categories</p>
                <b-link :to="{name: 'add_category'}" style="float: right">Add Category   </b-link>
            </template>
            
            <b-card-body>
                <table class="table stripped hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Parent</th>
                            <th colspan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody v-if="$root.state">
                        <tr>
                            <td colspan="5">
                                <b-spinner varient="primary"></b-spinner>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-if="!$root.state">
                        <tr v-for="(category, index) in categories" :key="index">
                            <td>{{ ++index }}</td>
                            <td>
                                <router-link :to="{name: 'category', params: {id: category.id}}">{{ category.title }}</router-link>
                            </td>
                            <td>
                                <router-link :to="{name: 'category', params: {id: category.parent}}">{{ getCategoryById(category.parent) }}</router-link>
                            </td>
                            <td>
                                <router-link :to="{name: 'edit_category', params: {id: category.id}}">Edit</router-link>
                            </td>
                            <td>
                                <a href="#" @click.prevent="deleteCategory($event, category.id)">Delete</a>
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
        categories() {
            return this.$store.getters.categories
        }
    },
    methods: {
        deleteCategory($evnet, id) {
            this.$store.dispatch('delete_category', id)
        },
        
        getCategoryById(id) {
            let a = this.categories.find(category => category.id == id)
            return a ? a.title : 'None'
        }
    }
}
</script>