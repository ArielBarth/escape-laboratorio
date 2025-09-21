// player.js
const Mochila = require('./mochila');

class Player {
    #mochila;

    constructor(name, capacidadeMochila = 5) {
        this.name = name;
        this.#mochila = new Mochila(capacidadeMochila);
    }

    addItem(item) {
        this.#mochila.guarda(item);
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

    setMochilaCapacidade(novaCapacidade) {
        this.#mochila.setCapacidade(novaCapacidade);
    }
}

module.exports = Player;