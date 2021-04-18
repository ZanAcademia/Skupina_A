class SeznamIger {
    // vseIgre je array razreda Igra
    constructor(vseIgre) {
        this.steviloIger = vseIgre.length;
        this.Igre = vseIgre;
        localStorage.setItem('storageVseIgre', JSON.stringify(this));
    }
}
export default SeznamIger;