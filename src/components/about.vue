<template>
  <div>
    <h1>ABOUT: {{ msg }}</h1>
  </div>
</template>


<script>
export default {
  name: 'about',
  props: {
    msg: String
  }
}
</script>