<template>
    <div>
        <vue-headful :title="pageTitle()" :description="pageDescription()"></vue-headful>
        <div v-if="category.images" class="image-bg" :style="`background-image: url('${category.images}')`"></div>

        <b-container class="mt-4 mb-4" v-if="category">
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
                    <b-col lg="4" md="6" sm="12" v-for="(product, index) in products" :key="index">
                        <Product :product="product" />
                    </b-col>
                </b-row>
            </div>

            <div v-if="!products.length > 0 && !category.children">
                <h3>Sorry, Nothing was found in {{ category.title }}!</h3>
            </div>

        </b-container>
    </div>
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
        },
        pageTitle() {
            return this.category.title + " - Categories" + this.$root.pageTitle()
        },
        pageDescription() {
            return "View Products in " + this.category.title + "."
        }
    },
    // beforeMount() {
    //     this.setTitle()
    // },


}
</script>

<style>
.image-bg {
    width: 100%;
    height: 350px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}
</style>
