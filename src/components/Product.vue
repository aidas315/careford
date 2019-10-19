<template>
    <div>
        <b-card bg-variant="light" :title="product.title" :img-src="image" img-top> 
            <b-card-sub-title>
                <h6>
                    @<router-link :to="{name: 'category', params: {id: product.category}}">{{ getCategoryById(product.category) }}</router-link>
                </h6>
            </b-card-sub-title>
            <b-card-text>{{ cleanIt(product.description).slice(0, 100) }}</b-card-text>
            <router-link class="form-control btn btn-primary" :to="{name: 'product', params: {id: product.id}}">Details</router-link>
        </b-card>
    </div>
</template>

<script>
export default {
    props: ['product'],
    computed: {
        categories() {
            return this.$store.getters.categories
        },
        image() {
            if (this.product.images) {
                if (this.product.images.includes(',')) {
                    return this.product.images.split(',').pop()
                }
                return this.product.images
            }
            return "https://picsum.photos/600/300/?image=25"
        }
    },
    methods: {
        getCategoryById(id) {
            let a = this.categories.find(category => {
                return category.id == id
            })
            return a ? a.title : 'Uncategorized'
        },
        cleanIt(strInputCode) {
            return strInputCode.replace(/<\/?[^>]+(>|$)/g, "")
        }
    }
}
</script>