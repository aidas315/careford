import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import { store } from './vuex'
import VueRoutes from './routes'
import VueRouter from 'vue-router'
import vueHeadful from "vue-headful"
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import CKEditor from '@ckeditor/ckeditor5-vue'
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { faPhone, faEnvelope, faArchway, faLayerGroup, faChevronRight } from "@fortawesome/free-solid-svg-icons"

library.add(
  faPhone,
  faEnvelope,
  faArchway,
  faLayerGroup,
  faWhatsapp,
  faChevronRight
)

Vue.use(Vuex)
Vue.use(CKEditor)
Vue.use(VueRouter)
Vue.use(BootstrapVue) 
Vue.config.productionTip = false
Vue.component("vue-headful", vueHeadful)
Vue.component("font-awesome-icon", FontAwesomeIcon)

const router = new VueRouter({
  mode: 'history',
  routes: VueRoutes,
  linkExactActiveClass: 'active'
})

new Vue({
  data: {
    title: 'CarefordCorp'
  },
  created() {
    this.$store.dispatch('load_banners')
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
    },
    pageTitle() {
      return " - " + this.title
    },
    pageDescription() {
      return `Careford Corporation is leading Manufacturer of professional Beauty Instruments. We strive to achieve quality without compromise in delivering great products, each time, every time. Careford Corporation focuses on doing the basics right and adding value through innovation and technical excellence. We pride ourselves on our exceptional services and bringing competitive solution to your product.`;
    }
  },
  store,
  router,
  render: h => h(App),
}).$mount('#app')
