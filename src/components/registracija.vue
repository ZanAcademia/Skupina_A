<template>
    <h1>Igre</h1>
    <div>
    <h3>Dodaj igro</h3>
    <div>
      <input class="font-16 w-320 obvezno" id="nov_uporabniskoIme" type="text" placeholder="Uporabniško ime" autocomplete="off" />
      <span class="obveznoPolje d-none">To polje je obvezno</span>
    </div>
    <div>
      <input class="font-16 font-arial w-320 obvezno" id="nov_geslo" type="password" placeholder="geslo" autocomplete="off" />
      <span class="obveznoPolje d-none">To polje je obvezno</span>
    </div>
    <div>
      Admin: <input id="nov_adminCheck" type="checkbox"/>
    </div>
    <button v-on:click="register" class="cursor-pointer mt-20">Registracija</button>
  </div>
  <div>
    <input class="font-16 font-arial w-320" id="izbrisi_id" type="text" placeholder="Id za izbris" autocomplete="off" />
    <button v-on:click="izbrisi" class="cursor-pointer mt-20">Izbrisi</button>
  </div>
  <div>
    <p v-if="uporabniskoImeObstaja" style="color:red;">{{uporabniskoImeUporabljeno}}</p>
  </div>
</template>

<script>
import Uporabnik from '../model/uporabnik.js'
import SeznamUporabnikov from '../model/SeznamUporabnikov.js'

export default {
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
        var novUporabnik = new Uporabnik(document.getElementById("nov_uporabniskoIme").value, document.getElementById("nov_geslo").value,document.getElementById("nov_adminCheck").value)
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
      izbrisi : function() {
        var vsiUporabniki = [];
        if(localStorage.getItem("storageVsiUporabniki") != null) {
          var res = JSON.parse(localStorage.getItem("storageVsiUporabniki"));
          vsiUporabniki = res.Uporabniki;
        }
        let index = 0
        for (index = 0; index < vsiUporabniki.length; index++) {
            const element = vsiUporabniki[index];
            if (element.id == document.getElementById("izbrisi_id").value)
                break;
        }
        --this.stevilouporabnikov;
        vsiUporabniki.splice(index, 1);
        var novSeznamUporabnikov = new SeznamUporabnikov(vsiUporabniki);
        console.log("novSeznamUporabnikov", novSeznamUporabnikov);
      },
    },
    data () {
      return {
        uporabniskoImeUporabljeno: "Uporabnisko ime ze uporabljeno!",
        uporabniskoImeObstaja: true
      }
    },
}
</script>
