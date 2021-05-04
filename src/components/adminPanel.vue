<template>
    <h1 class="font-daysLater generalRed font-60">Seznam uporabnikov</h1>
    <div class="mt-40 mb-60">
    <p v-if="niUporabnikov">{{niUporabnikovText}}</p>
    <table
    class="tabelaIger ml-auto mr-auto"
    v-bind:key="seznamVsehUporabnikov.length">
      <tr class="redBackground color-white">
        <th>ID</th>
        <th>Uporabnisko ime</th>
        <th>Geslo</th>
        <th>Admin</th>
        <th>Povišaj v pravice</th>
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
        <td>
          {{uporabnik.admin ? "yes" : "no"}}
        </td>
        <td>
            <a class="cursor-pointer" v-on:click="povisaj(uporabnik.id)"><img src="../images/icons/delete.png" /></a>
        </td>
        <td>
          <a class="cursor-pointer" v-on:click="izbrisi(uporabnik.id)"><img src="../images/icons/delete.png" /></a>
        </td>
      </tr>
    </table>
    </div>
</template>
<script>
import {ref} from 'vue';
import SeznamUporabnikov from '../model/SeznamUporabnikov.js'

export default ({
    created() {
        this.napolniSeznam();
    },
    methods: {
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
      povisaj: function(id) {
        var vsiUporabniki = [];
        if(localStorage.getItem("storageVsiUporabniki") != null) {
          var res = JSON.parse(localStorage.getItem("storageVsiUporabniki"));
          vsiUporabniki = res.Uporabniki;
        }
        let index = 0
        for (index = 0; index < vsiUporabniki.length; index++) {
            const element = vsiUporabniki[index];
            if (element.id == id){
                element.admin = true;
                break;
            }
        }
        var novSeznamUporabnikov = new SeznamUporabnikov(vsiUporabniki);
        localStorage.setItem("storageVsiUporabniki",JSON.stringify(novSeznamUporabnikov));
        this.seznamVsehUporabnikov = [];
        this.napolniSeznam();
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
        localStorage.setItem("storageVsiUporabniki",JSON.stringify(novSeznamUporabnikov));
        this.seznamVsehUporabnikov = [];
        this.napolniSeznam();
      },
    },
    data() {
        let seznamVsehUporabnikov = ref([]);
        return {
            seznamVsehUporabnikov: seznamVsehUporabnikov,
            niUporabnikovText: "Ni uporabnikov",
        }
    }
})
</script>
