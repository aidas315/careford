<template>
  <div>
    <b-carousel
      id="carousel-0"
      v-model="slide"
      :interval="4000"
      controls
      fade
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333; text-align: left"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd" 
      v-if="banners"
    >
      <div v-for="(banner, index) in banners" :key="index">
        
            <b-carousel-slide 
                
                
                
                :img-src="banner.image"
                
            >
            </b-carousel-slide>
            
        
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

<style>
#carousel-0 
.img-fluid.w-100 {
    height: 100vh;
    width: max-content !important;
}
</style>