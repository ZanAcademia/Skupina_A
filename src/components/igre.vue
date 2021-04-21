<template>
<!-- seznam iger -->
  <h1>Igre</h1>
  <button v-on:click="odpriNovaIgraModal" v-show="this.uporabnikAdmin">Nova igra</button>
  <div class="mt-40 mb-60">
    <h3>Seznam iger</h3>
    <p v-if="prikaziNiIger">{{niIger}}</p>
    <table 
    v-if="prikaziTabelo" 
    class="tabelaIger ml-auto mr-auto"
    v-bind:key="this.seznamVsehIger.length">
      <tr>
        <th>ID</th>
        <th>Ime</th>
        <th>Opis</th>
        <th>Cena</th>
        <th v-show="this.uporabnikAdmin">Uredi</th>
        <th v-show="this.uporabnikAdmin">Odstrani</th>
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
        <td v-show="this.uporabnikAdmin">
          <a v-on:click="odpriUrediIgroModal(igra.id)" class="cursor-pointer">Uredi</a>
        </td>
        <td v-show="this.uporabnikAdmin">
          <a class="cursor-pointer" v-on:click="odstraniIgro(igra.id)">x</a>
        </td>
      </tr>
    </table>
  </div>

<!-- popup za novo igro -->
<div id="novaIgraModal" ref="novaIgraModal" class="modal d-none">
    <div class="modalContent">
        <div class="modalHeader">
        <h3>Nova igra</h3>
        <a class="modalClose" v-on:click="zapriModalNovaIgra">x</a>
        </div>
        <div class="modalBody">
            <div>
                <input class="font-16 w-320 obvezno obvezno_novo" id="novaIgra_ime" type="text" placeholder="Ime igre" autocomplete="off" />
                <p class="obveznoPolje obveznoPoljeUstvariIgro d-none">To polje je obvezno</p>
            </div>
            <div>
                <textarea class="font-16 font-arial w-320" id="novaIgra_opis" placeholder="Opis igre" autocomplete="off" />
            </div>
            <div>
                <input class="font-16 w-320 obvezno obvezno_novo" id="novaIgra_cena" type="text" placeholder="Cena izposoje" autocomplete="off" v-on:keydown="jeStevilka($event)" />
                <p class="obveznoPolje obveznoPoljeUstvariIgro d-none">To polje je obvezno</p>
            </div>
            <button v-on:click="dodajIgro" class="cursor-pointer mt-20">Dodaj igro</button>
        </div>
    </div>
</div>

<!-- popup za urejanje igre -->
<div id="urediIgroModal" ref="urediIgroModal" class="modal d-none">
    <div class="modalContent">
        <div class="modalHeader">
        <h3>Uredi igro</h3>
        <a class="modalClose" v-on:click="zapriModalUrediIgro">x</a>
        </div>
        <div class="modalBody">
            <div>
                <input class="font-16 w-320 obvezno obvezno_uredi" id="urediIgro_ime" type="text" placeholder="Ime igre" autocomplete="off" />
                <p class="obveznoPolje obveznoPoljeUrediIgro d-none">To polje je obvezno</p>
            </div>
            <div>
                <textarea class="font-16 font-arial w-320" id="urediIgro_opis" placeholder="Opis igre" autocomplete="off" />
            </div>
            <div>
                <input class="font-16 w-320 obvezno obvezno_uredi" id="urediIgro_cena" type="text" placeholder="Cena izposoje" autocomplete="off" v-on:keydown="jeStevilka($event)" />
                <p class="obveznoPolje obveznoPoljeUrediIgro d-none">To polje je obvezno</p>
            </div>
            <input id="idIgre" readonly class="d-none"/>
            <button v-on:click="shraniUrejenoIgro(this.idIzbraneIgre)" class="cursor-pointer mt-20">Shrani</button>
        </div>
    </div>
</div>
</template>

<script>
  // import Igra from '../model/igra';
  import {ref} from 'vue';
  import Igra from '../model/igra';
  import SeznamIger from '../model/SeznamIger';

  export default {
    // create list of games
    created() {
      this.napolniSeznam();
      this.uveljaviVlogo();
      // console.log('Component has been created!');
    },
    methods: {
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
        this.urediPrazenSeznamIger();
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
      urediPrazenSeznamIger : function() {
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
            this.seznamVsehIger = novSeznamIger.Igre;
            this.urediPrazenSeznamIger();
          }
        }
      },
      odpriNovaIgraModal : function() {
        document.getElementById('novaIgraModal').classList.remove('d-none');
      },
      dodajIgro : function() {
        let lahkoNadaljuje = true;
        let requiredFields = document.getElementsByClassName('obvezno_novo');
        for(let i = 0; i < requiredFields.length; i++) {
          if(requiredFields[i].value)
              requiredFields[i].nextSibling.classList.add('d-none');
          else
              requiredFields[i].nextSibling.classList.remove('d-none');
        }
        let errorSporocila = document.getElementsByClassName('obveznoPoljeUstvariIgro');
        errorSporocila.forEach(function(item) {
          if(!item.classList.contains('d-none')) {
            lahkoNadaljuje = false;
            return;
          }
        });

        if(lahkoNadaljuje) {
          var vseIgre = [];
          // ustvarimo igro
          var novaIgra = new Igra(document.getElementById('novaIgra_ime').value, document.getElementById('novaIgra_opis').value,document.getElementById('novaIgra_cena').value)
          console.log(novaIgra);
          // pridobimo obstoječe igre
          if(localStorage.getItem('storageVseIgre') != null) {
          var res = JSON.parse(localStorage.getItem('storageVseIgre'));
          vseIgre = res.Igre;
          }
          // dodamo našo igro v seznam iger
          vseIgre.push(novaIgra);
          var novSeznamIger = new SeznamIger(vseIgre);
          this.seznamVsehIger = novSeznamIger.Igre;
          this.zapriModalNovaIgra();
        }
        this.urediPrazenSeznamIger();
      },
      zapriModalNovaIgra : function() {
          document.getElementById('novaIgraModal').classList.add('d-none');
          document.getElementById('novaIgra_ime').value = '';
          document.getElementById('novaIgra_opis').value = '';
          document.getElementById('novaIgra_cena').value = '';
          let errorSporocila = document.getElementsByClassName('obveznoPoljeUstvariIgro');
          errorSporocila.forEach(function(item) {
            item.classList.add('d-none');
          });
      },
      odpriUrediIgroModal : function(id) {
        this.idIzbraneIgre = id;
        var izbranaIgra = this.seznamVsehIger.find(x => x.id == id);
        document.getElementById('urediIgro_ime').value = izbranaIgra.ime;
        document.getElementById('urediIgro_opis').value = izbranaIgra.opis;
        document.getElementById('urediIgro_cena').value = izbranaIgra.cena;
        document.getElementById('urediIgroModal').classList.remove('d-none');
      },
      shraniUrejenoIgro : function(id) {
        let lahkoNadaljuje = true;
        let requiredFields = document.getElementsByClassName('obvezno_uredi');
        for(let i = 0; i < requiredFields.length; i++) {
          if(requiredFields[i].value)
              requiredFields[i].nextSibling.classList.add('d-none');
          else
              requiredFields[i].nextSibling.classList.remove('d-none');
        }
        let errorSporocila = document.getElementsByClassName('obveznoPoljeUrediIgro');
        errorSporocila.forEach(function(item) {
          if(!item.classList.contains('d-none')) {
            lahkoNadaljuje = false;
            return;
          }
        });

        if(lahkoNadaljuje) {
          let vseIgre = [];
          if(localStorage.getItem('storageVseIgre') != null) {
            var res = JSON.parse(localStorage.getItem('storageVseIgre'));
            vseIgre = res.Igre;
          }
          // najdemo igro za urejanje, nastavimo vrednosti in jo damo v local storage
          let igraZaSpremenit = vseIgre.find(x => x.id == id);
          igraZaSpremenit.ime = document.getElementById('urediIgro_ime').value;
          igraZaSpremenit.opis = document.getElementById('urediIgro_opis').value;
          igraZaSpremenit.cena = document.getElementById('urediIgro_cena').value
          console.log(vseIgre);
          let novSeznamIger = new SeznamIger(vseIgre);
          this.seznamVsehIger = novSeznamIger.Igre;
          this.zapriModalUrediIgro();
        }
        this.urediPrazenSeznamIger();
      },
      zapriModalUrediIgro : function() {
          document.getElementById('urediIgroModal').classList.add('d-none');
          document.getElementById('urediIgro_ime').value = '';
          document.getElementById('urediIgro_opis').value = '';
          document.getElementById('urediIgro_cena').value = '';
          let errorSporocila = document.getElementsByClassName('obveznoPoljeUrediIgro');
          errorSporocila.forEach(function(item) {
            item.classList.add('d-none');
          });
      }
    },

    setup () {
      let seznamVsehIger = ref([]);
      return {
        seznamVsehIger: seznamVsehIger,
        niIger: "Na seznamu ni iger",
        prikaziTabelo: ref(false),
        prikaziNiIger: ref(true),
        idIzbraneIgre: ref(""),
        vpisanUporabnik: ref(null),
        uporabnikVpisan: ref(false),
        uporabnikAdmin: ref(false)
      }
    },
  }
</script>