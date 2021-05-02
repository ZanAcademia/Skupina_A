<template>
  <nav>
    <ul class="nav_links m-0 p-0">
      <li><router-link v="Igre" :to="{ name:'home' }"><img src="../images/Logo.png" class="headerLogo" /></router-link></li>
      <!-- <li><router-link v="Kosarica" :to="{ name:'kosarica'}">Kosarica</router-link></li> -->
      <div class="buttons d-flex flex-right-center">
        <div>
          <router-link v-if="prikaziLogin" :to="{ name:'login'}"><button class="btn-main">Vpis</button></router-link>
          <router-link v-if="prikaziLogin" :to="{ name:'register'}"><button class="btn-main btn-registracija">Registracija</button></router-link>
          <span class="uporabniskoIme" v-if="prikaziOdjavo">{{loginInfo}}</span>
          <a id="gumbKosarica" class="btn-main" href="/kosarica" v-if="prikaziOdjavo">Košarica ({{this.steviloIgerVKosarici}})</a>
          <button v-on:click="odjavi" v-if="prikaziOdjavo" class="btn-main ml-10">Odjava</button>
        </div>
      </div>
    </ul>
  </nav>
</template>

<script>
import {ref} from 'vue';
export default {
    created() {
      if (localStorage.getItem("vpisanUporabnik") != null) {
        this.prikaziLogin = false;
        this.prikaziOdjavo = true;
        var res = JSON.parse(localStorage.getItem("vpisanUporabnik"));
        this.loginInfo += res.uporabniskoIme;
      }
      if(localStorage.getItem("storageKosarica") != null) {
          var res2 = JSON.parse(localStorage.getItem("storageKosarica"));
          this.steviloIgerVKosarici = res2.steviloIger;
      }
    },
    methods: {
      odjavi() {
        localStorage.removeItem("vpisanUporabnik");
        localStorage.removeItem("storageKosarica");
        location.href ='/igre';
      },
    },
    data(){
      return {
        prikaziLogin : true,
        prikaziOdjavo : false,
        loginInfo : "",
        steviloIgerVKosarici: ref(0.0)
      }
    }
}
</script>

<style>
/* ---------------------------------navigation bar------------------------------- */
.nav_links {
    overflow: hidden;
    background-color: #333;
    list-style: none;
}
/* ---------------------------------navigation bar strani------------------------------- */
.nav_links li {
    float: left;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
}

.nav_links li a {
    text-decoration: none;
    color: lightgray;
}

.nav_links li:hover {
    background-color: #dc143c;
    color: black;
}

.nav_links li.active {
    background-color: #dc143c;
    color: white;
}

/* ---------------------------------navigation bar login register------------------------------- */

.nav_links .buttons {
    height:80px;
    color: lightgray;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
}


/* .buttons button {
    margin-left: 20px;
    padding: 3px 12px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
    background-color: #4CAF50;
} */
</style>