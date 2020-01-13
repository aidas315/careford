<template>
  <div class="image-container" v-if="product">
    <vue-headful :title="pageTitle()" :description="pageDescription()"></vue-headful>
    <b-carousel v-if="product.images"
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-height="300"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <div v-if="product.images.includes(',')">
        <div v-for="(image, index) in product.images.split(',')" :key="index">
          <div v-if="image">
            <b-carousel-slide
              
              :caption="product.title"
              :img-src="image"
            >
              <div v-if="authenticated">
                <a href="#" @click.prevent="removeProductImage($event, {id: product.id, imageURI: image})">Remove this Image</a>
              </div>
            </b-carousel-slide>
          </div>
        </div>
    </div>
    <div v-else>
      <b-carousel-slide
        
        
        :caption="product.title"
        :img-src="product.images"
      >
        <div v-if="authenticated">
          <a href="#" @click.prevent="removeProductImage($event, {id: product.id, imageURI: product.images})">Remove this Image</a>
        </div>
      </b-carousel-slide>
    </div>
    </b-carousel>
    <br><br><br>
    <b-container>
      <h3> {{ product.title }}</h3>
      <h6>@<router-link :to="{name: 'category', params: {id: product.category}}">{{ getCategoryById(product.category) }}</router-link></h6>
      <br>
      <div v-html="product.description"></div>
    </b-container>
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
    beforeMount() {
      this.setTitle()
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      },
      removeProductImage($event, payload) {
        this.$store.dispatch('remove_image', payload)
        $event.target.parentElement.parentElement.parentElement.style.display = 'none'
      },
      getCategoryById(id) {
        let a = this.categories.find(category => {
          return category.id == id
        })
        return a ? a.title : 'Uncategorized'
      },
      pageTitle() {
        return this.product.title + " - " + this.product.category + " - " + "Products" + this.$root.pageTitle()
      },
      pageDescription() {
        return "View Products in " + this.product.description
      }
    },
    computed: {
      product() {
        return this.$store.getters.product(this.$route.params.id)
      },
      authenticated() {
        return this.$store.getters.authenticated
      },
      categories() {
        return this.$store.getters.categories
      },
      
    },
  }
</script>

<style scoped>
.carousel-item {
  min-height: 400px;
    max-height: 400px;
}
</style>