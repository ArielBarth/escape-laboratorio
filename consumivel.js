// consumivel.js
const Item = require('./item');

class Consumivel extends Item {
    #effectFunction;
    #usado = false;

    constructor(name, description, effectFunction) {
        super(name, description);
        this.#effectFunction = effectFunction;
    }

    usar(target) {
        if (this.#usado) {
            console.log(`${this.name} já foi usado.`);
            return false;
        }

        if (this.#effectFunction) {
            const result = this.#effectFunction(target);
            if (result) this.#usado = true;
            return result;
        }

        console.log("Nada aconteceu.");
        return false;
    }
}

module.exports = Consumivel;