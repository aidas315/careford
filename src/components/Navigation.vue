<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">
      <b-navbar-brand :to="{name: 'home'}">{{ $root.title }}</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown>

            <template slot="button-content">
              <font-awesome-icon :icon="['fas', 'layer-group']"></font-awesome-icon> &nbsp; Categories
            </template>

            <b-dropdown-item v-for="(category) in categories_without_child" :key="category.id" :to="{name: 'category', params: {id: category.id}}">
              {{ category.title }}
            </b-dropdown-item>




            <b-dropdown-item
              v-for="(category, index) in categories_with_child" :key="index"
              :to="{name: 'category', params: {id: category.id}}"
              style="position: relative"
              class="mainmenu"
             >
              <div style="padding-right: 20px; display: block; width: 100%; position: relative;" @mouseover="viewSubMenu($event)" @mouseout="hideSubMenu($event)">
                {{ category.title }}
                <div style="position: absolute; top: 0px; right: 2px; pointer-events: none;">
                  <font-awesome-icon :icon="['fas', 'chevron-right']"></font-awesome-icon>
                </div>
              </div>




              <div v-if="category.children.includes(',')" class="submenu" >
                  <b-dropdown-item v-for="(subcat) in category.children.split(',')" :key="subcat.id" :to="{name: 'category', params: {id: subcat}}">
                  {{ getCategoryById(subcat) }}
                </b-dropdown-item>
              </div>
              <div class="submenu" v-else  >
                <b-dropdown-item :to="{name: 'category', params: {id: category.children}}">
                  {{ getCategoryById(category.children) }}
                </b-dropdown-item>
              </div>
            </b-dropdown-item>
          </b-nav-item-dropdown>


          <!-- <b-nav-item-dropdown
            v-for="(category, index) in categories_with_child" :key="index"
            id="my-nav-dropdown"
            :text="category.title"
            toggle-class="nav-link-custom"
            left
          >
            <div v-if="category.children.includes(',')">
              <b-dropdown-item v-for="(subcat) in category.children.split(',')" :key="subcat.id" :to="{name: 'category', params: {id: subcat}}">
                {{ getCategoryById(subcat) }}
              </b-dropdown-item>
            </div>
            <div v-else>
              <b-dropdown-item :to="{name: 'category', params: {id: category.children}}">
                {{ getCategoryById(category.children) }}
              </b-dropdown-item>
            </div>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item :to="{name: 'category', params: {id: category.id}}">
              {{ category.title }}
            </b-dropdown-item>
          </b-nav-item-dropdown> -->

          <!-- <b-nav-item v-for="(category) in categories_without_child" :to="{name: 'category', params: {id: category.id}}" :key="category.id">
            {{ category.title }}
          </b-nav-item> -->

          <b-nav-item :to="{name: 'about'}">About</b-nav-item>
          <b-nav-item :to="{name: 'contact'}">Contact</b-nav-item>

        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-form @submit.prevent="search">
            <b-form-input size="sm" class="mr-sm-2" v-model="argument" required placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-navbar-nav v-if="authenticated">
            <b-nav-item :to="{name: 'admin'}">Dashboard</b-nav-item>
            <b-nav-item @click.prevent="$root.logout">Logout</b-nav-item>
          </b-navbar-nav>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data() {
    return {
      argument: null
    }
  },
  computed: {
    authenticated() {
      return this.$store.getters.authenticated
    },
    categories() {
      return this.$store.getters.categories
    },
    categories_with_child() {
      return this.$store.getters.categories_with_child
    },
    categories_without_child() {
      return this.$store.getters.categories_without_child
    }
  },
  methods: {
    getCategoryById(id) {
      let a = this.categories.find(category => category.id == id)
      return a ? a.title : 'None'
    },
    search() {
      this.$router.push({ name: 'search', query: { data: this.argument } })
    },
    getParentsLastChild (element) {
      const parent = element.parentNode
      const submenu = parent.childNodes[parent.childNodes.length - 1]
      return submenu
    },
    viewSubMenu($event) {
      let submenu = this.getParentsLastChild($event.target)
      submenu.style.display = 'block'
    },
    hideSubMenu($event) {
      let submenu = this.getParentsLastChild($event.target)

      submenu.addEventListener('mouseout', () => {
        submenu.style.display = 'none'
      })
    }
  }
}
</script>

<style>
.submenu{
  position: absolute;
  top: 0px;
  left: 101%;
  z-index: 1000;
  display: none;
  /* float: left; */
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  overflow: auto;
}
</style>
