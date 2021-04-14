export default class Uporabnik {
    constructor(novUporabnik) {
        let { ime, uporabniskoIme, geslo } = novUporabnik;
        this.geslo = geslo
        this.ime = ime || 'neznan'
        this.uporabniskoIme = uporabniskoIme
    }
}



