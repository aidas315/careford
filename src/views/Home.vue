<template>
    <div>
        <vue-headful :title="pageTitle()" :description="pageDescription()"></vue-headful>
        
        <div>
            <Carousel />
            <br><br>
            <b-container v-if="categories && categories.length > 0" class="mb-4">
                <h3>Categories</h3>
                <!-- <p>
                    <b-badge variant="light" v-for="(subcat, index) in categories" :key="index">
                        <router-link :to="{name: 'category', params: {id: subcat.id}}">
                            {{ subcat.title }}
                        </router-link>
                    </b-badge>
                </p> -->
                
                <b-row class="mt-4 mb-4 categories">
                    <b-col cols="3" v-for="(subcat, index) in categories.slice(0, 4)" :key="index">
                        <b-card :img-src="subcat.images" :img-alt="subcat.title" img-top>
                            <b-card-text style="text-align: center">
                                
                                <router-link :to="{name: 'category', params: {id: subcat.id}}">
                                    <b-card-sub-title>
                                        {{ subcat.title }}
                                    </b-card-sub-title>
                                </router-link>
                            </b-card-text>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
            <br>
            <b-container v-if="featured_products && featured_products.length > 0" :style="$store.getters.banners.length == 0 ? 'margin-top: 50px' : ''">
                <h3>Featured Products</h3>
                <b-row class="mt-4 mb-4">
                    <b-col cols="4" v-for="(product, index) in featured_products.slice(0, 9)" :key="index">
                        <Product :product="product" />
                    </b-col>
                </b-row>
            </b-container>
            <!-- <br><br> -->
            <b-container v-if="products && products.length > 0" :style="$store.getters.banners.length == 0 ? 'margin-top: 50px' : ''">
                <h3>Latest Products</h3>
                <b-row class="mt-4 mb-4">
                    <b-col cols="4" v-for="(product, index) in products.slice(0, 9)" :key="index">
                        <Product :product="product" />
                    </b-col>
                </b-row>
            </b-container>
        </div>
        
    </div>
</template>

<script>
const Product = () => import('../components/Product')
const Carousel = () => import('../components/Carousel')

export default {
    components: {
        Product,
        Carousel
    },
    computed: {
        products() {
            return this.$store.getters.products
        },
        featured_products() {
            return this.$store.getters.featured_products
        },
        categories() {
            return this.$store.getters.categories
        },
    },
    methods: {
        pageTitle() {
            return "Home" + this.$root.pageTitle()
        },
        pageDescription() {
            return this.$root.pageDescription()
        }

    }
}
</script>

<style scoped>
.categories .card-img-top {
    height: 150px;
}
</style>