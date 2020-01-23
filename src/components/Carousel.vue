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
      v-if="banners"
    >
      <div v-for="(banner, index) in banners" :key="index">
        <a :href="banner.link" target="_blank" title="See More">
          <div style="height: 400px; position: relative;">
            <b-carousel-slide 
              :text="cleanIt(banner.description).slice(0, 100)"
              style="margin-bottom: 40px"
              :caption="banner.title"
              :img-src="banner.image"
              
            >
            </b-carousel-slide>
            
          </div>
        </a>
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
      banners() {
        return this.$store.getters.banners
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
        if (!strInputCode) return ""
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