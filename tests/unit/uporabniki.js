import Uporabniki from '../../src/data/uporabniki.js'
import Uporabnik from '../../src/model/uporabnik.js'
import {expect} from 'chai'
//import { shallowMount } from '@vue/test-utils'

// ustavri svoj storage objekt...
let testStorage = {
    getItem: function (key) {
        console.log('getItem', key )
        //should not pass value
        let result = {podatki: this[key]}
        return JSON.stringify(result);
    }
}
let testniPodatki = new Uporabnik({ime: 'ime', geslo: 'geslo', uporabniskoIme: 'uporabniskoIme'})

testStorage.uporabniki = [testniPodatki, testniPodatki];

// eslint-disable-next-line no-undef
describe('Cases', () => {

// eslint-disable-next-line no-undef
    /* TODO: naredite sami
    it('TestCase: constructor', () => {
        let testniPodatki = {ime: 'ime', geslo: 'geslo', uporabniskoIme: 'uporabniskoIme'}
        let novUporabnik = new Uporabniki(testniPodatki);
        expect(novUporabnik.ime).to.eql(testniPodatki.ime, 'novUporabnik ima ime');
    });
*/
// eslint-disable-next-line no-undef
    it('TestCase: metoda getAll', () => {
        let testObj = new Uporabniki(testStorage, []);
        expect(testObj.uporabniki).to.be.an.instanceof(Array);
        expect(testObj.uporabniki.length).to.eql(0);
        //test metode
        console.log("test getAll")
        let testResult = testObj.getAll();
        console.log("test getAll returned", testResult)
        expect(testResult).to.be.an.instanceof(Array);
        expect(testResult.length).to.eql(2);
        expect(testResult[1].ime).to.eql('ime');

    });
})



