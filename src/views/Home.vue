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
        }
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