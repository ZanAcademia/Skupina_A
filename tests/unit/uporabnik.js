import Uporabnik from '../../src/model/uporabnik.js'
import {expect} from 'chai'
//import { shallowMount } from '@vue/test-utils'

// eslint-disable-next-line no-undef
describe('Cases', () => {

// eslint-disable-next-line no-undef
    it('TestCase: constructor', () => {
        let testniPodatki = {ime: 'ime', geslo: 'geslo', uporabniskoIme: 'uporabniskoIme'}
        let novUporabnik = new Uporabnik(testniPodatki);
        expect(novUporabnik.ime).to.eql(testniPodatki.ime, 'novUporabnik ima ime');
    });

// eslint-disable-next-line no-undef
    it('TestCase: nepopoln constructor', () => {
        let testniPodatki = { uporabniskoIme: 'uporabniskoIme'}
        let novUporabnik = new Uporabnik(testniPodatki);
        expect(novUporabnik.ime).to.eql('neznan', 'novUporabnik ima ime');
    });
})



