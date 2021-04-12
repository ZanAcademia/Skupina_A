<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
     <h3>IGRA</h3>
    <input type="text" name="ime">
    Človek ne jezi se
  </div>
</template>



<script>
export default {
  name: 'assa',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
  color: red;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
