class Igra {
    constructor(ime, opis, cena) {
        // generira unikaten ID
        var possibleId = 0;
        if(localStorage.getItem("storageVseIgre") != null) {
            var res = JSON.parse(localStorage.getItem("storageVseIgre"));
            var vseIgre = res.Igre;
            if(vseIgre != null && typeof(igre) != undefined && vseIgre.length > 0) {
                while(vseIgre.find(item => item.id == possibleId)) {
                    ++possibleId;
                }
            }
        }
        this.id = possibleId;
        this.ime = ime;
        this.opis = opis;
        // this.slika = novaIgra.slika;
        this.cena = cena;
        this.naVoljo = true;
    }
}

export default Igra;
