<template>
    <b-container>
        <br><br><br>
        <b-card no-body>
            <template v-slot:header>
                <p class="mb-0" style="float: left">View Products</p>
                <b-link :to="{name: 'add_product'}" style="float: right">Add Product   </b-link>
            </template>
            <b-card-body>
                <table class="table stripped hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th colspan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) in products" :key="index">
                            <td>{{ ++index }}</td>
                            <td>
                                <router-link :to="{name: 'product', params: {id: product.id}}">{{ product.title }}</router-link>
                            </td>
                            <td>
                                <router-link :to="{name: 'category', params: {id: product.category}}">{{ getCategory(product.category) }}</router-link>
                            </td>
                            <td>
                                <router-link :to="{name: 'edit_product', params: {id: product.id}}">Edit</router-link>
                            </td>
                            <td>
                                <a href="#" @click.prevent="deleteProduct($event, product.id)">Delete</a>
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
        products() {
            return this.$store.getters.products
        },
        categories() {
            return this.$store.getters.categories
        }
    },
    methods: {
        deleteProduct($evnet, id) {
            this.$store.dispatch('delete_product', id)
        },
        getCategory(id) {
            let va = this.categories.find(category => category.id == id)
            return va ? va.title : ''
        }
    }
}
</script>