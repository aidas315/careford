<template>
    <b-container>
        <br><br><br>
        <b-row>
            <b-col>
                <b-card no-body>
                    <template v-slot:header>
                        <p class="mb-0" style="float: left">{{ form_type == 'new' ? 'Add Product' : 'Edit Product' }}</p>
                        <b-link :to="{name: 'view_products'}" style="float: right">View Products   </b-link>
                    </template>

                    <b-card-body>
                        <b-form @submit.prevent="handleForm">
                            <b-form-group
                                id="title-input-group"
                                label="Product Title"
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
                                id="category-input-group"
                                label="Product Category"
                                label-for="category-input"
                            >
                                <!--<b-form-select id="category-input" v-model="parent" :options="categories"></b-form-select>-->
                                <select class="form-control" name="asad" id="category-input" v-model="category">
                                    
                                    <option v-for="(cate, index) in categories" :key="index" :value="cate.id">{{ cate.title }}</option>
                                </select>
                            </b-form-group> 
                            <b-form-group label="Product Image" label-for="image-input">
                                <b-form-file id="image-input"
                                    v-model="images"
                                    accept="image/*"
                                    :multiple="true"
                                    :required="form_type == 'new'"
                                    placeholder="Choose a file or drop it here..."
                                    drop-placeholder="Drop file here..."
                                    ></b-form-file>
                                    <span v-if="form_type == 'edit'">Adds new Images and doesn't delete previous ones.</span>
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
                            
                            <b-form-checkbox
                                id="checkbox-1"
                                v-model="featured"
                                name="checkbox-1"
                                :value="true"
                                :unchecked-value="false"
                                >
                                Mark as Featured
                                </b-form-checkbox>
                    <br>
                            <b-button type="submit" variant="primary">
                                <b-spinner small v-if="$root.state"></b-spinner>
                                {{ form_type == 'new' ? 'Add' : 'Update' }}
                            </b-button>

                        </b-form>
                    </b-card-body>
                </b-card>
            </b-col>
            <b-col>
                <b-card no-body>
                    <template v-slot:header>
                        <p class="mb-0">Images</p>
                    </template>
                    <b-card-body>
                        <div v-if="images != null && images.length > 0">
                            <p><b>Recently Added</b></p>
                            <div class="gallery">
                                <div class="gallery-item" v-for="(image, key) in images" :key="key">
                                    <img class="gallery-image" :src="readImgAsDataURL(image)">
                                    <div class="actions">
                                        <div class="wrapper">
                                            <div class="btns">
                                                <a class="button is-rounded" :href="readImgAsDataURL(image)" target="_blank"><i class="fas fa-eye"></i> View</a>
                                                <a class="button is-rounded" @click="deleteImageFromArray(key)"><i class="fas fa-trash"></i> Delete</a>
                                            </div>    
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="form_type == 'edit' && old_images != null">
                            <p><b>Previous Images</b></p>
                            <div class="gallery">
                                <!-- <div v-if="!old_images.contains(',')"> -->
                                    <!-- <div class="gallery-item">
                                        <img class="gallery-image" :src="old_images">
                                        <div class="actions">
                                            <div class="wrapper">
                                                <div class="btns">
                                                    <a class="button is-rounded" :href="old_images" target="_blank"><i class="fas fa-eye"></i> View</a>
                                                </div>    
                                            </div>
                                        </div>
                                    </div> -->
                                <!-- </div> -->
                                <div>
                                    <div class="gallery-item" v-for="(image, key) in old_images.split(',')" :key="key">
                                        <img class="gallery-image" :src="image" :id="'imgFromDB'+key">
                                        <div class="actions">
                                            <div class="wrapper">
                                                <div class="btns">
                                                    <a class="button is-rounded" :href="image" target="_blank"><i class="fas fa-eye"></i> View</a>
                                                    <a class="button is-rounded" style="cursor: pointer" @click="deleteImageFromDatabase({image, key})"><i class="fas fa-trash"></i> Delete</a>
                                                </div>    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
        
    </b-container>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
    data() {
        return {
            title: null,
            images: null,
            category: null,
            featured: false,
            old_images: null,
            form_type: 'new',
            description: null,
            editor: ClassicEditor,
        }
    },
    mounted() {
        if (this.$route.params.id) {
            this.title = this.product.title
            this.featured = this.product.featured
            this.category = this.product.category
            this.description = this.product.description
            this.old_images = this.product.images
            this.form_type = 'edit'
        }
    },
    computed: {
        categories() {
            return this.$store.getters.categories
        },
        product() {
            if (this.$route.params.id) {
                return this.$store.getters.product(this.$route.params.id)
            }   
            return null
        }
    },
    methods: {
        handleForm() {  
            let data = {
                title: this.title,
                images: this.images,
                featured: this.featured,
                category: this.category,
                description: this.description,
            }
            if (this.$route.params.id) {
                data = {
                    ...data,
                    id: this.$route.params.id
                }
            }
            if (this.form_type == 'new' ) {
                this.$store.dispatch('create_product', data)
                .then(data => {
                    this.$router.push({ name: 'view_products' })
                })
            } else {
                this.$store.dispatch('update_product', data)
                .then(data => {
                    this.$router.push({ name: 'view_products' })
                })
            }
        },
        readImgAsDataURL: function(file) {
            return URL.createObjectURL(file)
        },
        openBase64ImgInNewTab: function (data) {
            let image = new Image();
            image.src = "data:image/jpg;base64," + data;
            let w = window.open("");
            w.document.write(image.outerHTML);
        },
        deleteImageFromArray(idx) {           
            this.images.splice(idx, 1)
        },
        deleteImageFromDatabase(data) {
            // this.$store.dispatch('remove_image', id)
            // .then(res => {
            //     document.getElementById('imgFromDb'+id).remove()
            //     this.$toastr('info', 'Success! Image was removed.', 'Information')
            // }).catch(err => {
            //     this.$toastr('error', 'Aah! Something went wrong.', 'Error')
            // })
            this.$store.dispatch('remove_image', { id: this.product.id, imageURI: data.image })
                .then(_ => {
                    document.getElementById('imgFromDB'+data.key).remove()
                })
        }
    }
}
</script>

<style src="../../../assets/gallery.css" scoped></style>