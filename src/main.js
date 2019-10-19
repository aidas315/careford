import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import { store } from './vuex'
import VueRoutes from './routes'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import CKEditor from '@ckeditor/ckeditor5-vue'

Vue.use(Vuex)
Vue.use(CKEditor)
Vue.use(VueRouter)
Vue.use(BootstrapVue) 
Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes: VueRoutes,
  linkExactActiveClass: 'active'
})

new Vue({
  data: {
    title: 'Careford'
  },
  created() {
    this.$store.dispatch('load_products')
    this.$store.dispatch('load_categories')
    this.$store.dispatch('check_authentication')
  },
  computed: {
    state() {
      return this.$store.getters.state
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push({ name: 'home' })
    }
  },
  store,
  router,
  render: h => h(App),
}).$mount('#app')
