import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import banner from './banner'
import product from './product'
import category from './category'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loading: false
    },
    mutations: {
        set_loading(state, payload) {
            state.loading = payload
        },
    },
    getters: {
        state: (state) => {
            return state.loading
        }
    },
    modules: {
        auth,
        banner,
        product,
        category
    }
})

