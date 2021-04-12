<template>
  <glavna-navigacija></glavna-navigacija>
  <img alt="Vue logo" src="./assets/logo.png">
  <router-view></router-view>
</template>

<script>
import navigacija from '@/components/navigacija.vue'

export default {
  name: 'App',
  components: {
    'glavna-navigacija': navigacija
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
