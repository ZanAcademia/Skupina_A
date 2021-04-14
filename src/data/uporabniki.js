//TODO: import uporabnik

export default class Uporabniki {
    constructor(storageObject, poljeUporabnikov) {
        this.uporabniki = poljeUporabnikov
        this.storageObject = storageObject;
    }
    getAll() {
        let uporabniki = this.storageObject.getItem('uporabniki');
        //mapira iz podatkovnega modela v nas model
        this.uporabniki = JSON.parse(uporabniki).podatki;
        return this.uporabniki;
    }
}



