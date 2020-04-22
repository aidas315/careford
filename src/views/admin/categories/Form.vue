<template>
    <b-container>
        <br><br><br>
        <b-row>
            <b-col>
                <b-card no-body>
                        <template v-slot:header>
                            <p class="mb-0" style="float: left">{{form_type == 'new' ? 'Add Category' : 'Edit Category'}}</p>
                            <b-link :to="{name: 'view_categories'}" style="float: right">View Categories   </b-link>
                        </template>
                    <b-card-body>
                        <b-form @submit.prevent="handleForm">
                            <b-form-group
                                id="title-input-group"
                                label="Category Title"
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
                                label="Category Parent"
                                label-for="category-input"
                            >
                                <!--<b-form-select id="category-input" v-model="parent" :options="categories"></b-form-select>-->
                                <select  class="form-control" name="asad" id="category-input" v-model="parent">
                                    <option selected :value="null">None</option>
                                    <option v-for="(cate, index) in categories" :key="index" :value="cate.id">{{ cate.title }}</option>
                                </select>
                            </b-form-group>
                        <b-form-group label="Category Image" label-for="image-input">
                                <b-form-file id="image-input"
                                    v-model="images"
                                    accept="image/*"
                                    :required="form_type == 'new'"
                                    placeholder="Choose a file or drop it here..."
                                    drop-placeholder="Drop file here..."
                                    ></b-form-file>
                            </b-form-group>
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
                        <div v-if="images != null">
                            <p><b>Recently Added</b></p>
                            <div class="gallery">
                                <div class="gallery-item">
                                    <img class="gallery-image" :src="readImgAsDataURL(images)">
                                    <div class="actions">
                                        <div class="wrapper">
                                            <div class="btns">
                                                <a class="button is-rounded" :href="readImgAsDataURL(images)" target="_blank"><i class="fas fa-eye"></i> View</a>
                                                <a class="button is-rounded" @click="deleteImage()"><i class="fas fa-trash"></i> Delete</a>
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
                                    <div class="gallery-item">
                                        <img class="gallery-image" :src="old_images">
                                        <div class="actions">
                                            <div class="wrapper">
                                                <div class="btns">
                                                    <a class="button is-rounded" :href="old_images" target="_blank"><i class="fas fa-eye"></i> View</a>
                                                    <!-- <a class="button is-rounded" @click="deleteImageFromArray(key)"><i class="fas fa-trash"></i> Delete</a> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                <!-- </div> -->
                                <!-- <div v-else>
                                    <div class="gallery-item" v-for="(image, key) in old_images.split(',')" :key="key">
                                        <img class="gallery-image" :src="image">
                                        <div class="actions">
                                            <div class="wrapper">
                                                <div class="btns">
                                                    <a class="button is-rounded" :href="image" target="_blank"><i class="fas fa-eye"></i> View</a>
                                                    <a class="button is-rounded" @click="deleteImageFromArray(key)"><i class="fas fa-trash"></i> Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>

    </b-container>
</template>

<script>

export default {
    data() {
        return {
            title: null,
            parent: null,
            images: null,
            old_images: null,
            form_type: 'new',
        }
    },
    created() {
        if (this.$route.params.id) {
            this.title = this.category.title
            this.parent = this.category.parent || null
            this.old_images = this.category.images || null
            this.form_type = 'edit'
        }
    },
    computed: {
        categories() {
            return this.$store.getters.categories
        },
        category() {
            if (this.$route.params.id) {
                return this.$store.getters.category(this.$route.params.id)
            }
            return null
        }
    },
    methods: {
        handleForm() {
            let arrOfImgs = []
            arrOfImgs.push(this.images)
            let data = {
                title: this.title,
                images: arrOfImgs
            }
            if (this.parent || this.form_type == 'edit') {
                data = {
                    ...data,
                    parent: this.parent
                }
            }
            if (this.form_type == 'new') {
                this.$store.dispatch('create_category', data)
                .then(_ => {
                    this.$router.push({ name: 'view_categories' })
                })
            } else {
                data = {
                    ...data,
                    id: this.$route.params.id
                }
                this.$store.dispatch('update_category', data)
                .then(_ => {
                    this.$router.push({ name: 'view_categories' })
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
        deleteImage() {
            this.images = null
        },
        deleteImageFromDatabase(id) {
            this.$store.dispatch('remove_image', id)
            .then(res => {
                document.getElementById('imgFromDb'+id).remove()
                this.$toastr('info', 'Success! Image was removed.', 'Information')
            }).catch(err => {
                this.$toastr('error', 'Aah! Something went wrong.', 'Error')
            })
        }
    }
}
</script>

<style src="../../../assets/gallery.css" scoped></style>
