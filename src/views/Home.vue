<template>
    <div>
        <vue-headful :title="pageTitle()" :description="pageDescription()"></vue-headful>
        <b-container v-if="$root.state" class="text-center">
            <br><br><br><br>
            <b-spinner variant="primary" label="Spinning"></b-spinner><br>
            <strong>Loading...</strong>
        </b-container>
        <div v-else>
            <Carousel />
            <br><br>
            <b-container>
                <h3>Categories</h3>
                <p>
                    <b-badge variant="light" v-for="(subcat, index) in categories" :key="index">
                        <router-link :to="{name: 'category', params: {id: subcat.id}}">
                            {{ subcat.title }}
                        </router-link>
                    </b-badge>
                </p>
            </b-container>
            <br>
            <b-container v-if="featured_products" :style="$store.getters.banners.length == 0 ? 'margin-top: 50px' : ''">
                <h3>Featured Products</h3>
                <b-row class="mt-4 mb-4">
                    <b-col cols="4" v-for="(product, index) in products.slice(0, 9)" :key="index">
                        <Product :product="product" />
                    </b-col>
                </b-row>
            </b-container>
            <!-- <br><br> -->
            <b-container v-if="products" :style="$store.getters.banners.length == 0 ? 'margin-top: 50px' : ''">
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