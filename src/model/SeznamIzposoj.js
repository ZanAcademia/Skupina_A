class SeznamIzposoj {
    constructor(vseIzposoje) {
        this.steviloIzposoj = vseIzposoje.length;
        this.Izposoje = vseIzposoje;
        localStorage.setItem('storageIzposoje', JSON.stringify(this));
    }
}

export default SeznamIzposoj;