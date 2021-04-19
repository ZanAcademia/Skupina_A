<template>
  <h1>Igre</h1>
  <div>
    <h3>Dodaj igro</h3>
    <div>
      <input class="font-16 w-320 obvezno" id="novaIgra_ime" type="text" placeholder="Ime igre" autocomplete="off" />
      <span class="obveznoPolje d-none">To polje je obvezno</span>
    </div>
    <div>
      <textarea class="font-16 font-arial w-320" id="novaIgra_opis" placeholder="Opis igre" autocomplete="off" />
    </div>
    <div>
      <input class="font-16 w-320 obvezno" id="novaIgra_cena" type="text" placeholder="Cena izposoje" autocomplete="off" v-on:keydown="jeStevilka($event)" />
      <span class="obveznoPolje d-none">To polje je obvezno</span>
    </div>
    <button v-on:click="dodajIgro" class="cursor-pointer mt-20">Dodaj igro</button>
  </div>

  <div class="mt-40 mb-60">
    <h3>Seznam iger</h3>
    <p v-if="prikaziNiIger">{{niIger}}</p>
    <table 
    v-if="prikaziTabelo" 
    class="tabelaIger ml-auto mr-auto"
    v-bind:key="seznamVsehIger.length">
      <tr>
        <th>ID</th>
        <th>Ime</th>
        <th>Opis</th>
        <th>Cena</th>
        <th>Odstrani</th>
      </tr>
      <tr 
      v-for="igra in seznamVsehIger"
      v-bind:key="igra.id">
        <td>
          {{igra.id}}
        </td>
        <td>
          {{igra.ime}}
        </td>
        <td>
          {{igra.opis}}
        </td>
        <td class="text-right">
          {{igra.cena}} €
        </td>
        <td>
          <a class="cursor-pointer" v-on:click="odstraniIgro(igra.id)">x</a>
        </td>
      </tr>
    </table>
    
  </div>
</template>

<script>
import Igra from '../model/igra';
import SeznamIger from '../model/SeznamIger';
  export default {
    // create list of games
    created() {
      this.napolniSeznam();
      // console.log('Component has been created!');
    },
    methods: {
      dodajIgro : function() {
        var requiredFields = document.getElementsByClassName('obvezno');
        for(var i = 0; i < requiredFields.length; i++) {
          if(requiredFields[i].value)
            requiredFields[i].nextSibling.classList.add('d-none');
          else
            requiredFields[i].nextSibling.classList.remove('d-none');
        }
        if(document.querySelector('.obveznoPolje:not(.d-none)') != null)
          return;
        var vseIgre = [];
        // ustvarimo igro
        var novaIgra = new Igra(document.getElementById("novaIgra_ime").value, document.getElementById("novaIgra_opis").value,document.getElementById("novaIgra_cena").value)
        console.log(novaIgra);
        // pridobimo obstoječe igre
        if(localStorage.getItem("storageVseIgre") != null) {
          var res = JSON.parse(localStorage.getItem("storageVseIgre"));
          vseIgre = res.Igre;
        }
        // dodamo našo igro v seznam iger
        vseIgre.push(novaIgra);
        var novSeznamIger = new SeznamIger(vseIgre);
        console.log("novSeznamIger", novSeznamIger);
        location.reload();
      },
  
      napolniSeznam : function() {
        var vseIgre = [];
        if(localStorage.getItem("storageVseIgre") != null) {
          var res = JSON.parse(localStorage.getItem("storageVseIgre"));
          vseIgre = res.Igre;
          if(vseIgre != null && vseIgre.length > 0) {
            vseIgre.forEach(igra => {
              this.seznamVsehIger.push(igra);
            });
          }
        }
        if(this.seznamVsehIger.length == 0) {
          this.prikaziTabelo = false;
          this.prikaziNiIger = true;
        }
        else {
          this.prikaziTabelo = true;
          this.prikaziNiIger = false;
        }
        
      },
      jeStevilka : function(event) {
        var code = event.keyCode;
        if (code > 31 && (code < 48 || code > 57))
          event.preventDefault();
      },
      odstraniIgro : function(id) {
        var igre = this.seznamVsehIger;
        for(var i = 0; i < this.seznamVsehIger.length; i++) {
          if(igre[i].id == id) {
            igre.splice(i, 1);
            var novSeznamIger = new SeznamIger(igre);
            console.log("novSeznamIger", novSeznamIger);
            if(novSeznamIger.steviloIger == 0)
              location.reload();
          }
        }
      }
    },
    data () {
      return {
        seznamVsehIger: [],
        niIger: "Na seznamu ni iger",
        prikaziTabelo: false,
        prikaziNiIger: true
      }
    },
  }
</script>