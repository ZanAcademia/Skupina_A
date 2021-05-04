<template>
  <br>
  <h1 class="font-daysLater generalRed font-60">Kosarica</h1>
  <div class="mt-40 mb-60">
    <p v-if="prikaziKosaricaPrazna">{{kosaricaPrazna}}</p>
    <table 
    v-if="prikaziTabelo" 
    class="tabelaKosarica ml-auto mr-auto"
    v-bind:key="this.seznamVsehIger.length">
      <tr class="redBackground color-white">
        <th>ID</th>
        <th>Ime</th>
        <th>Št. tednov</th>
        <th>Cena</th>
        <th v-show="this.uporabnikVpisan">Odstrani</th>
      </tr>
      <tr 
      v-for="igra in seznamVsehIger"
      v-bind:key="igra.id">
        <td>
          {{igra.id}}
        </td>
        <td class="text-left font-bold">
          {{igra.imeIgre}}
        </td>
        <td class="text-left">
          {{igra.tedniIzposoje}}
        </td>
        <td class="text-right">
          {{igra.cena}} €
        </td>
        <td v-show="this.uporabnikVpisan">
          <a class="cursor-pointer" v-on:click="odstraniIgroIzKosarice(igra.id)"><img src="../images/icons/delete.png" /></a>
        </td>
      </tr>
    </table>
  </div>

  <p class="font-bold font-18 mt-20">Skupaj: {{this.skupnaCena}} €</p>
  <div class="text-center mt-10">
    <button class="btn-main" v-if="prikaziTabelo" v-on:click="oddajNarocilo">Oddaj naročilo</button>
  </div>

<!-- popup uspeh -->
<div id="uspehModal" ref="uspehModal" class="modal d-none">
    <div class="modalContent">
        <div class="modalHeader">
          <h3>Narocilo uspesno oddano!</h3>
          <a class="modalClose" v-on:click="zapriUspeh">x</a>
        </div>
        <div class="modalBody">
          <button class="ml-10 btn-main" v-on:click="zapriUspeh">Vredu</button> 
        </div>
    </div>
</div>

</template>

<script>
  import {ref} from 'vue';
  import Kosarica from '../model/Kosarica';
  import Izposoja from '../model/Izposoja';
  import SeznamIzposoj from '../model/SeznamIzposoj';
  import SeznamIger from '../model/SeznamIger';
  export default {
    created() {
      this.napolniKosarico();
      this.uveljaviVlogo();
    },
    methods: {
      oddajNarocilo : function() {
        if(localStorage.getItem("storageKosarica") != null) {
          let res = JSON.parse(localStorage.getItem("storageKosarica"));
          var igreVKosarici = res.Igre;
          if(localStorage.getItem('storageVseIgre') != null) {
            var seznamIgerJson = JSON.parse(localStorage.getItem('storageVseIgre'));
            var seznamIger = seznamIgerJson.Igre;
            for(var z = 0; z < igreVKosarici.length; z++) {
              var izposojenaIgra = seznamIger.find(x => x.id == igreVKosarici[z].idIgre);
              if(typeof izposojenaIgra != 'undefined') {
                izposojenaIgra.naVoljo = false;
              }
            }
            var novSeznamIger = new SeznamIger(seznamIger);
            console.log(novSeznamIger);
          }

          var izposojeZaOddajo = [];
          var obstojeceIzposoje = [];
          for(var i = 0; i < igreVKosarici.length; i++) {
            var novaIzposoja = new Izposoja(igreVKosarici[i], this.vpisanUporabnik.uporabniskoIme, this.vpisanUporabnik.id);
            izposojeZaOddajo.push(novaIzposoja); 
          }
          var novSeznamIzposoj;
          if(localStorage.getItem('storageIzposoje') != null) {
              obstojeceIzposoje = JSON.parse(localStorage.getItem('storageIzposoje')).Izposoje;
              for(var j = 0; j < izposojeZaOddajo.length; j++) {
              obstojeceIzposoje.push(izposojeZaOddajo[j]);
            }
            novSeznamIzposoj = new SeznamIzposoj(obstojeceIzposoje);
          }
          else 
            novSeznamIzposoj = new SeznamIzposoj(izposojeZaOddajo);
          console.log(novSeznamIzposoj);
          

          this.prikaziUspeh();
          var novaKosarica = new Kosarica([]);
          this.seznamVsehIger = novaKosarica.Igre;
          this.urediPrazenSeznamIger();
          var elem = document.getElementById('gumbKosarica');
          elem.innerText = 'Košarica (' + novaKosarica.steviloIger + ')';
          this.skupnaCena = 0.0;
        }
      },
      odstraniIgroIzKosarice : function(id) {
        var igre = this.seznamVsehIger;
        for(var i = 0; i < this.seznamVsehIger.length; i++) {
          if(igre[i].id == id) {
            igre.splice(i, 1);
            var novSeznamIger = new Kosarica(igre);
            this.seznamVsehIger = novSeznamIger.Igre;
            let cena = 0.0;
            this.seznamVsehIger.forEach(igra => {
              cena += parseFloat(igra.cena);
            });
            this.skupnaCena = cena.toFixed(2);
            this.urediPrazenSeznamIger();
            var elem = document.getElementById('gumbKosarica');
            elem.innerText = 'Košarica (' + novSeznamIger.steviloIger + ')';
          }
        }
      },
      prikaziUspeh : function() {
        document.getElementById('uspehModal').classList.remove('d-none');
      },
      zapriUspeh : function() {
        document.getElementById('uspehModal').classList.add('d-none');
      },
      napolniKosarico : function() {
        var vseIgre = [];
        if(localStorage.getItem("storageKosarica") != null) {
          var res = JSON.parse(localStorage.getItem("storageKosarica"));
          vseIgre = res.Igre;
          if(vseIgre != null && vseIgre.length > 0) {
            let cena = 0.0;
            vseIgre.forEach(igra => {
              cena += parseFloat(igra.cena);
              this.seznamVsehIger.push(igra);
            });
            this.skupnaCena = cena.toFixed(2);
          }
        }
        this.urediPrazenSeznamIger();
      },
      urediPrazenSeznamIger : function() {
        if(this.seznamVsehIger.length == 0) {
          this.prikaziTabelo = false;
          this.prikaziKosaricaPrazna = true;
        }
        else {
          this.prikaziTabelo = true;
          this.prikaziKosaricaPrazna = false;
        }
      },
      uveljaviVlogo : function() {
        let vpisanUporabnikTemp = localStorage.getItem("vpisanUporabnik");
        if(vpisanUporabnikTemp != null && typeof vpisanUporabnikTemp != 'undefined') {
          this.vpisanUporabnik = JSON.parse(localStorage.getItem("vpisanUporabnik"));
          if(this.vpisanUporabnik != null) {
            this.uporabnikVpisan = true;
            this.uporabnikAdmin = this.vpisanUporabnik.admin;
          }
        }
        if(!this.uporabnikVpisan) {
          location.href = '/igre';
        }
      },
    },
    setup () {
      let seznamVsehIger = ref([]);
      return {
        seznamVsehIger: seznamVsehIger,
        kosaricaPrazna: "Košarica je prazna",
        prikaziTabelo: ref(false),
        prikaziKosaricaPrazna: ref(true),
        idIzbraneIgre: ref(""),
        vpisanUporabnik: ref(null),
        uporabnikVpisan: ref(false),
        uporabnikAdmin: ref(false),
        skupnaCena: ref(0.0)
      }
    }
  }
</script>
