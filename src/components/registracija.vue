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
    <div class="mt-20">
      Je administrator: <input id="nov_adminCheck" type="checkbox"/>
    </div>
    <button v-on:click="register" class="btn-main mt-20">Registracija</button>
  </div>
  <div class="mt-40 mb-60"
  v-if="uporabnikAdmin">
    <h3>Seznam uporabnikov</h3>
    <p v-if="niUporabnikov">{{niUporabnikovText}}</p>
    <table 
    v-if="prikaziTabelo" 
    class="tabelaIger ml-auto mr-auto"
    v-bind:key="seznamVsehUporabnikov.length">
      <tr>
        <th>ID</th>
        <th>Uporabnisko ime</th>
        <th>Geslo</th>
        <th>Admin</th>
        <th>Odstrani</th>
      </tr>
      <tr 
      v-for="uporabnik in seznamVsehUporabnikov"
      v-bind:key="uporabnik.id">
        <td>
          {{uporabnik.id}}
        </td>
        <td>
          {{uporabnik.uporabniskoIme}}
        </td>
        <td>
          {{uporabnik.geslo}}
        </td>
        <td class="text-right">
          {{uporabnik.admin ? "yes" : "no"}}
        </td>
        <td>
          <a class="cursor-pointer" v-on:click="izbrisi(uporabnik.id)">x</a>
        </td>
      </tr>
    </table>
    
  </div>
</template>

<script>
import Uporabnik from '../model/uporabnik.js'
import SeznamUporabnikov from '../model/SeznamUporabnikov.js'

export default {
    created() {
      this.napolniSeznam();
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
        var novUporabnik = new Uporabnik(document.getElementById("nov_uporabniskoIme").value, document.getElementById("nov_geslo").value,document.getElementById("nov_adminCheck").checked)
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
      napolniSeznam : function() {
        var vsiUporabniki = [];
        if(localStorage.getItem("storageVsiUporabniki") != null) {
          var res = JSON.parse(localStorage.getItem("storageVsiUporabniki"));
          vsiUporabniki = res.Uporabniki;
          if(vsiUporabniki != null && vsiUporabniki.length > 0) {
            vsiUporabniki.forEach(uporabnik => {
              this.seznamVsehUporabnikov.push(uporabnik);
            });
          }
        }
        if(this.seznamVsehUporabnikov.length == 0) {
          this.prikaziTabelo = false;
          this.niUporabnikov = true;
        }
        else {
          this.prikaziTabelo = true;
          this.niUporabnikov = false;
        }
        
      },
      izbrisi : function(id) {
        var vsiUporabniki = [];
        if(localStorage.getItem("storageVsiUporabniki") != null) {
          var res = JSON.parse(localStorage.getItem("storageVsiUporabniki"));
          vsiUporabniki = res.Uporabniki;
        }
        let index = 0
        for (index = 0; index < vsiUporabniki.length; index++) {
            const element = vsiUporabniki[index];
            if (element.id == id)
                break;
        }
        --this.stevilouporabnikov;
        vsiUporabniki.splice(index, 1);
        var novSeznamUporabnikov = new SeznamUporabnikov(vsiUporabniki);
        console.log("novSeznamUporabnikov", novSeznamUporabnikov);
        this.$router.push('/login');
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
        seznamVsehUporabnikov: [],
        niUporabnikovText: "Ni uporabnikov",
        prikaziTabelo: false,
        niUporabnikov: true,
        uporabnikVpisan: false,
        uporabnikAdmin: false
      }
    },
}
</script>
