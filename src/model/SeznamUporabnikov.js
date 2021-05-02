class SeznamUporabnika{
    // vseIgre je array razreda Igra
    constructor(vsiUporabniki) {
        this.stevilouporabnikov = vsiUporabniki.length;
        this.Uporabniki = vsiUporabniki;
        localStorage.setItem('storageVsiUporabniki', JSON.stringify(this));
        console.log(this);
        console.log(JSON.stringify(this));
    }
}
export default SeznamUporabnika;