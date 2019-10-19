<template>
    <b-container class="mt-4 mb-4" v-if="category">
        <br><br><br>
        <b-row v-if="category.children && category.children.length">
            <b-col cols="12">
                <h3>Categories in @{{ category.title }}</h3>
                <p v-if="category.children.includes(',')">
                    
                        <b-badge variant="light" v-for="(subcat, index) in category.children.split(',')" :key="index">
                            <router-link :to="{name: 'category', params: {id: subcat}}">
                                {{ getCategoryById(subcat) }}
                            </router-link>
                        </b-badge>
                </p>
                <p v-if="!category.children.includes(',')">
                    <b-badge variant="light" v-if="getCategoryById(category.children)">
                        <router-link :to="{name: 'category', params: {id: category.children}}">
                            {{ getCategoryById(category.children) }}
                        </router-link>
                    </b-badge>
                </p>
            </b-col>
        </b-row>
        
        <hr v-if="category.children && category.children.length && products && products.length">
        <br>

        <div v-if="products && products.length">
            <h3>Products in @{{ category.title }}</h3>
            <b-row class="mt-4 mb-4">
                <b-col cols="4" v-for="(product, index) in products.slice(0, 9)" :key="index">
                    <Product :product="product" />
                </b-col>
            </b-row>
        </div>   

        <div v-if="!products.length > 0 && !category.children">
            <h3>Sorry, Nothing was found in {{ category.title }}!</h3>
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
        category() {
            return this.$store.getters.category(this.$route.params.id)
        },
        categories() {
            return this.$store.getters.categories
        },
        products() {
            return this.$store.getters.products_in_category(this.category.id)
        }
    },
    methods: {
        getCategoryById(id) {
            let a = this.categories.find(cat => {
                return cat.id == id
            })
            return a ? a.title : ''
        }
    },
    mounted() {
        console.log(this.category, this.products)
    }
}
</script>