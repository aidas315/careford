<template>
  <div class="image-container" v-if="product">
    <vue-headful :title="pageTitle()" :description="pageDescription()"></vue-headful>
    <b-container style="margin-top: 100px;">
      <b-row style="margin-bottom: 20px;">
        <b-col cols="12" style="text-align: center">
          <h3> {{ product.title }}</h3>
          <h6>@<router-link :to="{name: 'category', params: {id: product.category}}">{{ getCategoryById(product.category) }}</router-link></h6>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="6" sm="12" style="margin-bottom: 20px">
          <b-carousel v-if="product.images"
            id="carousel-product-image"
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

                    :img-src="image"
                  >
                    <!-- <div v-if="authenticated">
                      <a href="#" @click.prevent="removeProductImage($event, {id: product.id, imageURI: image})">Remove this Image</a>
                    </div> -->
                    <div class="actions">
                    <div class="wrapper">
                        <div class="btns">
                            <a class="button is-rounded" :href="image" target="_blank"><i class="fas fa-eye"></i> View</a>

                        </div>
                    </div>
                </div>
                  </b-carousel-slide>
                </div>
              </div>
            </div>
            <div v-else>
              <b-carousel-slide



                :img-src="product.images"
              >
                <!-- <div v-if="authenticated">
                  <a href="#" @click.prevent="removeProductImage($event, {id: product.id, imageURI: product.images})">Remove this Image</a>
                </div> -->
                <div class="actions">
                    <div class="wrapper">
                        <div class="btns">
                            <a class="button is-rounded" :href="product.images" target="_blank"><i class="fas fa-eye"></i> View</a>

                        </div>
                    </div>
                </div>
              </b-carousel-slide>
            </div>
          </b-carousel>
          <!-- <br><br><br> -->
        </b-col>
        <b-col md="6" sm="12">
          <b-container>
            <div ></div>
            <p><b>Details</b></p>
            <div v-html="product.description"></div>
          </b-container>
        </b-col>
      </b-row>
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

<style>
#carousel-1 {
    box-shadow: 1px 1px rgba(0, 0, 0, 0.2);
}
#carousel-1 .carousel-item {
  min-height: 400px;
    max-height: 400px;
}
 .actions {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    display: none;
}

 .actions .wrapper {
    height: 100%;
    width: 100%;
    /* display: flex;
    justify-content: center;
    align-items: center; */
    position: relative;
}

 .actions .wrapper .btns {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: right;
    margin: 0 10px;
}

 .actions .wrapper .button {
    display: inline-block;
    margin: 5px 5px;
}

 .actions .wrapper .button * {
    display: inline-block;
    margin: 0 1px;
}

.actions {
    display: block;
    transition: all 320ms;
}
.carousel-caption {
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
