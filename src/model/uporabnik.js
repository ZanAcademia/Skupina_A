class Uporabnik {
    constructor(uporabniskoIme, geslo, adminCheck) {
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
        this.id = possibleId
        this.uporabniskoIme = uporabniskoIme
        this.geslo = geslo
        this.admin = adminCheck
    }
}

export default Uporabnik;