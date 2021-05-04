<template>
    <h1 class="font-daysLater generalRed font-60">Registracija</h1>
    <div>
    <!-- <h3>Nov uporabnik</h3> -->
    <div>
      <input class="font-16 w-320 obvezno" id="nov_uporabniskoIme" type="text" placeholder="Uporabniško ime" autocomplete="off" />
      <span class="obveznoPolje d-none">To polje je obvezno</span>
    </div>
    <div>
      <input class="font-16 font-arial w-320 obvezno" id="nov_geslo" type="password" placeholder="geslo" autocomplete="off" />
      <span class="obveznoPolje d-none">To polje je obvezno</span>
    </div>
    <button v-on:click="register" class="btn-main mt-20">Registracija</button>
  </div>
</template>

<script>
import Uporabnik from '../model/uporabnik.js'
import SeznamUporabnikov from '../model/SeznamUporabnikov.js'

export default {
    created() {
      this.uveljaviVlogo();
    },
    methods: {
        register : function() {
        var requiredFields = document.getElementsByClassName('obvezno');
        for(var i = 0; i < requiredFields.length; i++) {
          if(requiredFields[i].value)
            requiredFields[i].nextSibling.classList.add('d-none');
          else
            requiredFields[i].nextSibling.classList.remove('d-none');
        }
        if(document.querySelector('.obveznoPolje:not(.d-none)') != null)
          return;
        var vsiUporabniki = [];
        // ustvarimo novega uporabnika
        var novUporabnik = new Uporabnik(document.getElementById("nov_uporabniskoIme").value, document.getElementById("nov_geslo").value,false)
        console.log(novUporabnik);
        // pridobimo obstoječe uporabnike
        if(localStorage.getItem("storageVsiUporabniki") != null) {
          var res = JSON.parse(localStorage.getItem("storageVsiUporabniki"));
          vsiUporabniki = res.Uporabniki;
        }
        // dodamo našega uporabnika v seznam uporabnikov
        vsiUporabniki.push(novUporabnik);
        var novSeznamUporabnikov = new SeznamUporabnikov(vsiUporabniki);
        console.log("novSeznamUporabnikov", novSeznamUporabnikov);
        location.reload();
      },
      uveljaviVlogo : function() {
        let vpisanUporabnikTemp = localStorage.getItem("vpisanUporabnik");
        if(vpisanUporabnikTemp != null && typeof vpisanUporabnikTemp != 'undefined') {
          this.vpisanUporabnik = JSON.parse(localStorage.getItem("vpisanUporabnik"));
          console.log(this.vpisanUporabnik);
          console.log(this.vpisanUporabnik.admin);
          if(this.vpisanUporabnik != null) {
            this.uporabnikVpisan = true;
            this.uporabnikAdmin = this.vpisanUporabnik.admin;
          }  
        }
        
      },
    },
    data () {
      return {
        niUporabnikov: true,
        uporabnikVpisan: false,
        uporabnikAdmin: false
      }
    },
}
</script>
