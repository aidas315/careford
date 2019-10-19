<template>
    <b-container class="mt-4">
        <br><br><br>
        <h1 class="text-center">Admin Area</h1>
        <b-form @submit.prevent="onSubmit" class="pt-4">
            <b-form-group id="email-input-group" label="Email" label-for="email-input">
                <b-form-input id="email-input" type="email" required placeholder="Enter email address" v-model="email">
                </b-form-input>
            </b-form-group>
            <b-form-group id="password-input-group" label="Password" label-for="password-input">
                <b-form-input id="password-input" type="password" required placeholder="Enter password" v-model="password">
                </b-form-input>
            </b-form-group>
            <b-form-group class="text-danger" v-if="error">
                <span>{{ error }}</span>
            </b-form-group>
            <b-button type="submit" variant="primary">
                <b-spinner small label="spinning" v-if="$root.state"></b-spinner>
                Submit
            </b-button>
        </b-form>
    </b-container >
</template>

<script>
export default {
    data() {
        return {
            email: null,
            password: null,
            error: null
        }
    },
    computed: {
        user() {
            return this.$store.getters.current_user
        }
    },
    watch: {
        user (value) {
            if (value !== null && value != undefined) {
                this.$router.push({ name: 'admin' })
            }
        }
    },
    methods: {
        onSubmit() {
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password                
            }).catch(error => {
                this.error = error.message
            })
            
        }
    }
}
</script>