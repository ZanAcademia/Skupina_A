
import mojaOseba from '@/data/oseba.json'

let prva = 'asas';

export let delaj = function (msg) {
    return mojaOseba.name + 'IZPISI' + msg;
};

export let delaj2 = function (msg) {
    return mojaOseba.name + 'IZPISI' + msg;
};

class Oseba {
    constructor(name, ime) {
        this.name = name
        this.ime = ime
    }
}

export default Oseba

console.log(prva)

console.log(delaj2)
