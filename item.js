// item.js
class Item {
    #name;
    #description;

    constructor(name, description) {
        this.#name = name;
        this.#description = description;
    }

    get name() {
        return this.#name;
    }

    get description() {
        return this.#description;
    }

    // Método genérico que pode ser sobrescrito pelas subclasses
    use(target) {
        console.log("Nada aconteceu.");
        return false;
    }
}

module.exports = Item;