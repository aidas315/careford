<template>
    <div>
        <vue-headful :title="pageTitle()" :description="pageDescription()"></vue-headful>
        <div class="image-bg" :style="`background-image: url(${require('../assets/About.png')})`"></div>

        <b-container class="mt-4 mb-4">
            <h1 class="text-center">{{pageTitle()}}</h1>
            <b-row class="mt-5 mb-5">
                <b-col cols="8" md="8" sm="12">
                    <p style="font-size: 18px; line-height: 1.7;">{{ pageDescription() }}</p>
<!--                    <p>We've 18 years of experience in the field. We've served several clients and willing to serve many more. </p>-->
                </b-col>
                <b-col cols="4" md="4" sm="12">
                    <div class="image-bg" :style="`background-image: url(${require('../assets/About.png')}); height: 200px;`"></div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: "About",

        methods: {
            pageTitle() {
                return "About" + this.$root.pageTitle()
            },
            pageDescription() {
                return "Careford Corporation is leading Manufacturer of professional Beauty Instruments. We strive to achieve quality without compromise in delivering great products, each time, every time. Careford Corporation focuses on doing the basics right and adding value through innovation and technical excellence. We pride ourselves on our exceptional services and bringing competitive solution to your product."
            },

        },
    }
</script>

<style scoped>
    .image-bg {
        width: 100%;
        height: 370px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
    }
</style>
