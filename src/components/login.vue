<template>
    <h1 class="font-daysLater generalRed font-60">Vpis v portal</h1>
    <div>
    <!-- <h3>Vpis uporabnika</h3> -->
    <div>
      <input class="font-16 w-320 obvezno" id="uporabniskoIme" type="text" placeholder="Uporabniško ime" autocomplete="off" />
      <span class="obveznoPolje d-none">To polje je obvezno</span>
    </div>
    <div>
      <input class="font-16 font-arial w-320 obvezno" id="geslo" type="password" placeholder="geslo" autocomplete="off" />
      <span class="obveznoPolje d-none">To polje je obvezno</span>
    </div>
    <p id="napacniPodatki" class="error-msg d-none">Napačno uporabniško ime ali geslo!</p>
    <button v-on:click="login" class="btn-main mt-20">Vpiši se</button>
    <router-link :to="{ name:'register'}"><button class="btn-main btn-registracija">Registracija</button></router-link>
  </div>
</template>

<script>
export default {
    created() {
      // console.log('Component has been created!');
    },
    methods: {
        login : function() {
        var requiredFields = document.getElementsByClassName('obvezno');

        document.getElementById("napacniPodatki").classList.add("d-none");  

        for(var i = 0; i < requiredFields.length; i++) {
          if(requiredFields[i].value)
            requiredFields[i].nextSibling.classList.add('d-none');
          else
            requiredFields[i].nextSibling.classList.remove('d-none');
        }
        if(document.querySelector('.obveznoPolje:not(.d-none)') != null)
          return;
        var vsiUporabniki = [];
        var vpisanUporabnik = [];
        // uporabnisko ime in geslo za vpis
        var uporabniskoIme = document.getElementById('uporabniskoIme').value;
        var geslo = document.getElementById('geslo').value;
        // pridobimo obstoječe uporabnike
        if(localStorage.getItem("storageVsiUporabniki") != null) {
          var res = JSON.parse(localStorage.getItem("storageVsiUporabniki"));
          vsiUporabniki = res.Uporabniki;
        }
        // pogledamo ali so podatki pravilni
        var vpisan = false;
        for (let index = 0; index < vsiUporabniki.length; index++) {
            const element = vsiUporabniki[index];
            if (element.uporabniskoIme == uporabniskoIme && element.geslo == geslo) {
                console.log(element);
                vpisanUporabnik = element;
                vpisan = true;
                break;
            }
        }
        if (vpisan) {
            localStorage.setItem("vpisanUporabnik", JSON.stringify(vpisanUporabnik));
            // this.$router.push('/');
            location.href = "/igre";
        } else {
            document.getElementById("napacniPodatki").classList.remove("d-none");            
        }
      },
    },
    data () {
      return {
      }
    },
}
</script>