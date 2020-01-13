<template>
    <b-container class="mt-4 mb-4">
        <vue-headful :title="pageTitle()" description=""></vue-headful>
        <br><br><br>

        <b-row v-if="category_results && category_results.length">
            <b-col cols="12">
                <h3>Results in Categories</h3>
                <p>
                    <b-badge variant="light" v-for="(category, index) in category_results" :key="index">
                        <router-link :to="{name: 'category', params: {id: category.id}}">
                            {{ category.title }}
                        </router-link>
                    </b-badge>
                </p>
            </b-col>
        </b-row>
        
        <hr v-if="category_results && category_results.length && product_results && product_results.length">
        <br>
        <div v-if="product_results && product_results.length">
            <h3>Results in Products</h3>
            <b-row class="mt-4 mb-4">
                <b-col cols="4" v-for="(product, index) in product_results" :key="index">
                    <Product :product="product" />
                </b-col>
            </b-row>
        </div>

        <div v-if="!category_results.length && !product_results.length">
            <h1>Sorry, No result was found!</h1>
        </div>
    </b-container>
</template>

<script>
const Product = () => import('../components/Product')

export default {
    components: {
        Product
    },
    computed: {
        categories() {
            return this.$store.getters.categories
        },
        category_results() {
            return this.$store.getters.search_in_categories(this.$route.query.data)
        },
        product_results() {
            return this.$store.getters.search_products(this.$route.query.data)
        }
    },
    methods: {
        getCategoryById(id) {
            let a = this.categories.find(cat => {
                return cat.id == id
            })
            return a ? a.title : ''
        },
        pageTitle() {
            return "Search Results for " + this.$route.query.data + this.$root.pageTitle()
        }
    }
}
</script>