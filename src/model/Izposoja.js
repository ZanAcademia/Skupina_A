class Izposoja {
    constructor(igraIzKosarice, imeStranke, idStranke) {
        var possibleId = 0;
        var takenIds = "";
        if(localStorage.getItem("storageZavzetiIdjiIzposoje") != null) {
            takenIds = localStorage.getItem("storageZavzetiIdjiIzposoje");
            while(takenIds.includes("{" + possibleId + "}")) {
                ++possibleId;
            }
        }
        if(localStorage.getItem("storageIzposoje") != null) {
            var res = JSON.parse(localStorage.getItem("storageIzposoje"));
            var vseIzposoje = res.Izposoje;
            if(vseIzposoje != null && typeof(vseIzposoje) != undefined && vseIzposoje.length > 0) {
                while(vseIzposoje.find(item => item.id == possibleId) || takenIds.includes("{" + possibleId + "}")) {
                    ++possibleId;
                }
            }
        }
        this.id = possibleId;
        if(localStorage.getItem("storageZavzetiIdjiIzposoje") != null) 
            localStorage.setItem("storageZavzetiIdjiIzposoje", localStorage.getItem("storageZavzetiIdjiIzposoje") + " {" + possibleId + "}");
        else 
            localStorage.setItem("storageZavzetiIdjiIzposoje","{" + possibleId + "}");
        
        this.idIgre = igraIzKosarice.idIgre;
        this.imeIgre = igraIzKosarice.imeIgre;
        this.imeStranke = imeStranke;
        this.idStranke = idStranke;
        let rezOd = Date.now();
        let rezOdObj = new Date(rezOd)
        let rezDoObj = new Date();
        rezDoObj.setDate(rezDoObj.getDate() + (igraIzKosarice.tedniIzposoje * 7));
        this.rezervacijaOd = rezOdObj.getDate() + '. ' + rezOdObj.getMonth() + '. ' + rezOdObj.getFullYear();
        this.rezervacijaDo = rezDoObj.getDate() + '. ' + rezDoObj.getMonth() + '. ' + rezDoObj.getFullYear();
    }
}

export default Izposoja;