// player.js
const Mochila = require('./mochila');

class Player {
    #mochila;

    constructor(name) {
        this.name = name;
        this.#mochila = new Mochila();
    }

    addItem(item) {
        if (this.#mochila.guarda(item)) {
            console.log(`${item.name} foi adicionado ao inventário.`);
        } else {
            console.log(`Não foi possível adicionar ${item.name} ao inventário.`);
        }
    }

    hasItem(name) {
        return this.#mochila.tem(name);
    }

    showInventory() {
        this.#mochila.inventario();
    }

    getItem(name) {
        return this.#mochila.pega(name);
    }

    removeItem(name) {
        this.#mochila.remove(name);
    }
}

module.exports = Player;