<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      fade
      indicators
      img-height="550"
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333; text-align: left"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd" 
      v-if="featured_products"
    >
      <div v-for="(product, index) in featured_products" :key="index">
        <router-link :to="{name: 'product', params: {id: product.id}}">
          <div v-if="product.images.includes(',')">
          
            <b-carousel-slide
              :text="cleanIt(product.description).slice(0, 100)"
              :caption="product.title"
              :img-src="product.images.split(',').pop()"
            >
              
            </b-carousel-slide>
          </div>
          <div v-else>
            <b-carousel-slide
              :text="cleanIt(product.description).slice(0, 100)"
              
              :caption="product.title"
              :img-src="product.images"
            >
            </b-carousel-slide>
          </div>
        </router-link>
      </div>
    </b-carousel> 
  </div>
</template>

<script>
  export default {
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    computed: {
      featured_products() {
        return this.$store.getters.featured_products
      }
    },
    methods: {
      onSlideStart(slide) {   
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      },
      cleanIt(strInputCode) {
        return strInputCode.replace(/<\/?[^>]+(>|$)/g, "")
      }
    }
  }
</script>

<style scoped>
.carousel-item {
    max-height: 500px;
}
</style>