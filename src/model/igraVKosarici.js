class IgraVKosarici {
    constructor(idIgre, cena, tedniIzposoje, ime) {
        var possibleId = 0;
        if(localStorage.getItem("storageKosarica") != null) {
            var res = JSON.parse(localStorage.getItem("storageKosarica"));
            var vseIgre = res.Igre;
            if(vseIgre != null && typeof(vseIgre) != undefined && vseIgre.length > 0) {
                while(vseIgre.find(item => item.id == possibleId)) {
                    ++possibleId;
                }
            }
        }
        this.id = possibleId;
        this.idIgre = idIgre;
        this.tedniIzposoje = tedniIzposoje
        this.cena = (cena * tedniIzposoje).toFixed(2);
        this.imeIgre = ime;
    }
}

export default IgraVKosarici;