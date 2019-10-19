<template>
  <div>
    <Navigation />
    <router-view></router-view>
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