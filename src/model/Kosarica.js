class Kosarica {
    constructor(vseIgre) {
        this.steviloIger = vseIgre.length;
        this.Igre = vseIgre;
        localStorage.setItem('storageKosarica', JSON.stringify(this));
    }
}

export default Kosarica;