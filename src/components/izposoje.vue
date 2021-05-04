<template>
  <br>
  <h1 class="font-daysLater generalRed font-60">Aktivne izposoje</h1>
  <div class="mt-40 mb-60">
    <p v-if="prikaziIzposojePrazne">{{niIzposoj}}</p>
    <table 
    v-if="prikaziTabelo" 
    class="tabelaIzposoj ml-auto mr-auto"
    v-bind:key="this.seznamVsehIzposoj.length">
      <tr class="redBackground color-white">
        <th>ID</th>
        <th>Ime</th>
        <th>Izposojeno od</th>
        <th>Izposojeno do</th>
        <th>Stranka</th>
        <th v-show="this.uporabnikVpisan">Preklic</th>
      </tr>
      <tr 
      v-for="izposoja in seznamVsehIzposoj"
      v-bind:key="izposoja.id">
        <td>
          {{izposoja.id}}
        </td>
        <td class="text-left font-bold">
          {{izposoja.imeIgre}}
        </td>
        <td>
          {{izposoja.rezervacijaOd}}
        </td>
        <td>
          {{izposoja.rezervacijaDo}}
        </td>
        <td>
          {{izposoja.imeStranke}} (ID: {{izposoja.idStranke}})    
        </td>    
        <td v-show="this.uporabnikVpisan">
          <a class="cursor-pointer" v-on:click="preklicIzposoje(izposoja.id, izposoja.idIgre)"><img src="../images/icons/delete.png" /></a>
        </td>
      </tr>
    </table>
  </div>


</template>

<script>
import {ref} from 'vue';
import SeznamIzposoj from '../model/SeznamIzposoj';
import SeznamIger from '../model/SeznamIger';
     export default {
    created() {
      this.napolniIzposoje();
      this.uveljaviVlogo();
    },
    methods: {
      preklicIzposoje : function(id, idIgre) {
        var izposoje = [];
        for(var z = 0; z < this.seznamVsehIzposoj.length; z++) {
          izposoje.push(this.seznamVsehIzposoj[z]);
        }
        for(var i = 0; i < izposoje.length; i++) {
          if(izposoje[i].id == id) {
            izposoje.splice(i, 1);
            var novSeznamIzposoj = new SeznamIzposoj(izposoje);
            this.seznamVsehIzposoj = novSeznamIzposoj.Izposoje;
            this.urediPrazenSeznamIzposoj();
          }
        }
        if(localStorage.getItem('storageVseIgre') != null) {
          var seznamIgerJson = JSON.parse(localStorage.getItem('storageVseIgre'));
          var seznamIger = seznamIgerJson.Igre;
          var izposojenaIgra = seznamIger.find(x => x.id == idIgre);
          if(typeof izposojenaIgra != 'undefined') {
            izposojenaIgra.naVoljo = true;
            var novSeznamIger = new SeznamIger(seznamIger);
            console.log(novSeznamIger);
          }
        }
      },
      napolniIzposoje : function() {
        var vseIzposoje = [];
        if(localStorage.getItem("storageIzposoje") != null) {
          var res = JSON.parse(localStorage.getItem("storageIzposoje"));
          vseIzposoje = res.Izposoje;
          if(vseIzposoje != null && vseIzposoje.length > 0) {
            // let cena = 0.0;
            vseIzposoje.forEach(izposoja => {
            //   cena += parseFloat(igra.cena);
              this.seznamVsehIzposoj.push(izposoja);
            });
          }
        }
        this.urediPrazenSeznamIzposoj();
      },
      urediPrazenSeznamIzposoj : function() {
        if(this.seznamVsehIzposoj.length == 0) {
          this.prikaziTabelo = false;
          this.prikaziIzposojePrazne = true;
        }
        else {
          this.prikaziTabelo = true;
          this.prikaziIzposojePrazne = false;
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
        if(!this.uporabnikAdmin) {
          location.href = '/igre';
        }
      },
    },
    setup () {
      let seznamVsehIzposoj = ref([]);
      return {
        seznamVsehIzposoj: seznamVsehIzposoj,
        niIzposoj: "Ni aktivnih izposoj",
        prikaziTabelo: ref(false),
        prikaziIzposojePrazne: ref(true),
        vpisanUporabnik: ref(null),
        uporabnikVpisan: ref(false),
        uporabnikAdmin: ref(false),
      }
    }
  }
</script>