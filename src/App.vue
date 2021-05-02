<template>
  <glavna-navigacija></glavna-navigacija>
  <router-view></router-view>
</template>

<script>
import navigacija from '@/components/navigacija.vue'
import SeznamUporabnika from '@/model/SeznamUporabnikov.js'

export default {
  created() {
    if(localStorage.getItem("storageVsiUporabniki") == null) {
      try {
            var jsonUporabniki = require('../src/data/seznamUporabnikov.json');
            if(jsonUporabniki != null) {
              var lokalniUporabniki = jsonUporabniki;
              var arrUporabniki = [];
              if(lokalniUporabniki.Uporabniki != null && lokalniUporabniki.Uporabniki.length > 0) {
                lokalniUporabniki.Uporabniki.forEach(uporabnik => {
                  arrUporabniki.push(uporabnik);
                });
                var seznamUporabnikov = new SeznamUporabnika(arrUporabniki);
                localStorage.setItem("storageVsiUporabniki", JSON.stringify(seznamUporabnikov));
              }
            }
          }
          catch(e) {console.log(e);}
    }
  },
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
}
</style>
