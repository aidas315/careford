<template>
    <b-container>
        <br><br><br>
        <b-card no-body>
            <template v-slot:header>
                <p class="mb-0" style="float: left">{{ form_type == 'new' ? 'Add Banner' : 'Edit Banner' }}</p>
                <b-link :to="{name: 'view_banners'}" style="float: right">View Banners   </b-link>
            </template>

            <b-card-body>
                <b-form @submit.prevent="handleForm">
                    <b-form-group
                        id="title-input-group"
                        label="Banner Title"
                        label-for="title-input"
                    >
                        <b-form-input
                            id="title-input"
                            v-model="title"
                            type="text"
                            required
                            placeholder="Blade"
                            ></b-form-input>
                    </b-form-group>


                    <b-form-group
                        id="link-input-group"
                        label="Banner Link"
                        label-for="link-input"
                    >
                        <b-form-input
                            id="link-input"
                            v-model="link"
                            type="text"
                            required
                            placeholder="Blade"
                            ></b-form-input>
                    </b-form-group>

                    <b-form-group label="Product Image" label-for="image-input">
                        <b-form-file id="image-input"
                            v-model="image"
                            accept="image/*"
                            :multiple="false"
                            :required="form_type == 'new'"
                            placeholder="Choose a file or drop it here..."
                            drop-placeholder="Drop file here..."
                            ></b-form-file>
                            <span v-if="form_type == 'edit'">Replaces previous image.</span>
                    </b-form-group>
                    
                <b-form-group label="Description" label-for="description-input"> 
                        <!--<ckeditor :editor="editor" v-model="description" style="min-height: 900px"></ckeditor>-->
                        <b-form-textarea
                            id="textarea"
                            v-model="description"
                            placeholder="Enter something..."
                            rows="3"
                            max-rows="6"
                            ></b-form-textarea>
                     </b-form-group>
                    
                    
                    <b-button type="submit" variant="primary">
                        <b-spinner small v-if="$root.state"></b-spinner>
                        {{ form_type == 'new' ? 'Add' : 'Update' }}
                    </b-button>

                </b-form>
            </b-card-body>
        </b-card>
    </b-container>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
    data() {
        return {
            link: null,
            title: null,
            image: null,
            form_type: 'new',
            description: null,
            editor: ClassicEditor,
        }
    },
    mounted() {
        if (this.$route.params.id) {
            this.title = this.banner.title
            this.link = this.banner.link
            this.description = this.banner.description
            this.form_type = 'edit'
        }
    },
    computed: {
        banner() {
            if (this.$route.params.id) {
                return this.$store.getters.banner(this.$route.params.id)
            }   
            return null
        }
    },
    methods: {
        handleForm() {  
            let data = {
                link: this.link,
                title: this.title,
                image: this.image,
                description: this.description,
            }
            if (this.$route.params.id) {
                data = {
                    ...data,
                    id: this.$route.params.id
                }
            }
            if (this.form_type == 'new' ) {
                this.$store.dispatch('create_banner', data)
                .then(data => {
                    this.$router.push({ name: 'view_banners' })
                })
            } else {
                this.$store.dispatch('update_banner', data)
                .then(data => {
                    this.$router.push({ name: 'view_banners' })
                })
            }
        }
    }
}
</script>