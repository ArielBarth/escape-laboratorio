// item.js
// Classe base que representa qualquer item do jogo (Ferramentas e Objetos herdam desta)

class Item {
    /**
     * Construtor do item
     * @param {string} name - Nome do item
     * @param {string} description - Descrição do item
     */
    constructor(name, description) {
        this.name = name; // Nome identificador do item
        this.description = description; // Descrição detalhada do item
    }
}

module.exports = Item;