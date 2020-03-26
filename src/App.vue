<template>
  <div>
    <Navigation />
    <b-container v-if="$root.state" class="text-center">
            <br><br><br><br>
            <b-spinner variant="primary" label="Spinning"></b-spinner><br>
            <strong>Loading...</strong>
    </b-container>
    <div v-else>
        <router-view></router-view>
    </div>
    <Foot />
  </div>
</template>

<script>
const Foot = () => import('./components/Foot')
const Navigation = () => import('./components/Navigation')

export default {
  components: {
    Foot,
    Navigation
  }
}
</script>