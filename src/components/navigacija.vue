<template>
  <nav>
    <ul class="nav_links m-0">
      <div class="buttons">
        <router-link v-if="prikaziLogin" :to="{ name:'login'}"><button>Login</button></router-link>
        <router-link v-if="prikaziLogin" :to="{ name:'register'}"><button>Register</button></router-link>
        <p v-else>{{loginInfo}}</p>
      </div>
    </ul>
  </nav>
</template>

<script>
export default {
    created() {
      if (localStorage.getItem("vpisanUporabnik") != null) {
        this.prikaziLogin = false;
        var res = JSON.parse(localStorage.getItem("vpisanUporabnik"));
        this.loginInfo += res.uporabniskoIme;
      }
    },
    data(){
      return {
        prikaziLogin : true,
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