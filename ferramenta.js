// ferramenta.js
const Item = require('./item');

class Ferramenta extends Item {
    #usos;
    #useFunction;

    constructor(name, description, usos = Infinity, useFunction = null) {
        super(name, description);
        this.#usos = usos;
        this.#useFunction = useFunction;
    }

    get usos() {
        return this.#usos;
    }

    usar(target) {
        if (this.#usos <= 0) {
            console.log(`${this.name} não pode mais ser usada.`);
            return false;
        }

        if (this.#useFunction) {
            const result = this.#useFunction(target);
            if (result) this.#usos--;
            return result;
        }

        console.log("Nada aconteceu.");
        return false;
    }
}

module.exports = Ferramenta;