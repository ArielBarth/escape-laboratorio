// objeto.js
// Classe que representa objetos interativos do jogo, herdando de Item

const Item = require('./item');

class Objeto extends Item {
    /**
     * Construtor do Objeto
     * @param {string} name - Nome do objeto
     * @param {string} descAntes - Descrição antes de interagir/usá-lo
     * @param {string} descDepois - Descrição após a interação
     */
    constructor(name, descAntes, descDepois) {
        super(name, descDepois); // Herda name e description da classe Item
        this.descAntes = descAntes; // Descrição inicial
        this.descDepois = descDepois; // Descrição após ação
        this.acaoOk = false; // Flag se o objeto já foi ativado/interagido
    }

    /**
     * Retorna a descrição do objeto, dependendo se a ação já foi realizada
     * @returns {string} - Descrição atual do objeto
     */
    descricao() {
        return this.acaoOk ? this.descDepois : this.descAntes;
    }
}

module.exports = Objeto;
