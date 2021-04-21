<template>
  <nav>
    <ul class="nav_links m-0">
      <li><router-link v="Igre" :to="{ name:'home' }">Logo</router-link></li>
      <li><router-link v="Kosarica" :to="{ name:'kosarica'}">Kosarica</router-link></li>
      <div class="buttons">
        <router-link v-if="prikaziLogin" :to="{ name:'login'}"><button>Login</button></router-link>
        <router-link v-if="prikaziLogin" :to="{ name:'register'}"><button>Register</button></router-link>
        <span v-if="prikaziOdjavo">{{loginInfo}}</span>
        <div v-if="prikaziOdjavo"><button v-on:click="odjavi">Odjava</button></div>
      </div>
    </ul>
  </nav>
</template>

<script>
export default {
    created() {
      if (localStorage.getItem("vpisanUporabnik") != null) {
        this.prikaziLogin = false;
        this.prikaziOdjavo = true;
        var res = JSON.parse(localStorage.getItem("vpisanUporabnik"));
        this.loginInfo += res.uporabniskoIme;
      }
    },
    methods: {
      odjavi() {
        localStorage.removeItem("vpisanUporabnik");
        location.reload();
      },
    },
    data(){
      return {
        prikaziLogin : true,
        prikaziOdjavo : false,
        loginInfo : "Prijavljen je "
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
    background-color: #4CAF50;
    color: black;
}

.nav_links li.active {
    background-color: #4CAF50;
    color: white;
}

/* ---------------------------------navigation bar login register------------------------------- */

.nav_links .buttons {
    float: right;
    color: lightgray;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
}


.buttons button {
    margin-left: 20px;
    padding: 3px 12px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
    background-color: #4CAF50;
}
</style>