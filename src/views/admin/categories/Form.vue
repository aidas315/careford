<template>
    <b-container>
        <br><br><br>
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

export default {
    data() {
        return {
            title: null,
            parent: null,
            form_type: 'new',
        }
    },
    created() {
        if (this.$route.params.id) {
            this.title = this.category.title
            this.parent = this.category.parent || null
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
            let data = {
                title: this.title,
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
            
        }
    }
}
</script>