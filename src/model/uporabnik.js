class Uporabnik {
    constructor(uporabniskoIme, geslo, adminCheck) {
        // generira unikaten ID
        var possibleId = 0;
        if(localStorage.getItem("storageVsiUporabniki") != null) {
            var res = JSON.parse(localStorage.getItem("storageVsiUporabniki"));
            var vsiUporabniki = res.Uporabniki;
            if(vsiUporabniki != null && typeof(uporabnik) != undefined && vsiUporabniki.length > 0) {
                while(vsiUporabniki.find(item => item.id == possibleId)) {
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