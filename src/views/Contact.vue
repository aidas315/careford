<template>
    <div>
        <vue-headful :title="pageTitle()" :description="pageDescription()"></vue-headful>
        <div class="image-bg" :style="`background-image: url(${require('../assets/contact-us.jpg')})`"></div>

        <b-container class="mt-4 mb-4">
            <h1 class="text-center">{{pageTitle()}}</h1>
            <b-row class="mt-5 mb-5">
                <b-col cols="8" md="8" sm="12">
                    <p><b>Leave us a message!</b></p>
                    <b-form>
                        <b-form-row>
                            <b-col>
                                <b-form-group
                                        id="name-input-group"
                                        label="Name"
                                        label-for="name-input"
                                >
                                    <b-form-input
                                            id="name-input"
                                            v-model="name"
                                            type="text"
                                            required
                                            placeholder="Abdul Rehman"
                                    ></b-form-input>
                                </b-form-group>
                            </b-col>

                            <b-col>
                                <b-form-group
                                        id="email-input-group"
                                        label="Email or Phone"
                                        label-for="name-input"
                                >
                                    <b-form-input
                                            id="email-input"
                                            v-model="emp"
                                            type="text"
                                            required
                                            placeholder="+92 316 7943024"
                                    ></b-form-input>
                                </b-form-group>
                            </b-col>

                        </b-form-row>


                        <b-form-group label="Message" label-for="message-input">
                            <!--<ckeditor :editor="editor" v-model="description" style="min-height: 900px"></ckeditor>-->
                            <b-form-textarea
                                    id="textarea"
                                    v-model="message"
                                    placeholder="I'm web developer."
                                    rows="3"
                                    max-rows="6"
                            ></b-form-textarea>
                        </b-form-group>
                        <b-form-group>
                            <b-button type="submit" variant="primary">
                                <b-spinner small v-if="$root.state"></b-spinner>
                                Submit
                            </b-button>
                        </b-form-group>
                    </b-form>

                </b-col>
                <b-col cols="4" md="4" sm="12" class="contact">
                    <p>
                        <font-awesome-icon :icon="['fas', 'archway']"></font-awesome-icon>
                        <span style="margin-top: -30px; margin-left: 25px;">
                            <a href="https://goo.gl/maps/NLM2No7Q22tW4kWu8" target="_blank" title="View On Google Maps">  Near UC Office, New Adalat Garh, UK Road, Sialkot, Punjab, Pakistan.</a>
                        </span>
                    </p>
                    <p>
                        <font-awesome-icon :icon="['fas', 'phone']"></font-awesome-icon>
                        <span> <a href="tel:+923322492000" title="Dail This Number">+92 332 24 92 000</a></span>
                    </p>
                    <p>
                        <font-awesome-icon :icon="['fab', 'whatsapp']"></font-awesome-icon>
                        <span> <a href="https://wa.me/923456725715" target="_blank" title="Send Message on Whatsapp">+92 345 67 25 715</a></span>
                    </p>
                    <p>
                        <font-awesome-icon :icon="['fas', 'envelope']"></font-awesome-icon>
                        <span> <a href="mailto:carefordcorporation@gmail.com" title="Send Mail">carefordcorporation@gmail.com</a></span>
                    </p>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: "Contact",

        methods: {
            pageTitle() {
                return "Contact" + this.$root.pageTitle()
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
    .contact p {
        margin: 7px auto;
    }
    .contact p font-awesome-icon, .contact p span {
        display: inline-block;
    }
    .contact p span {
        margin-left: 10px;
    }
</style>
