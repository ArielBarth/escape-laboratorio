// ferramenta.js
// Classe que representa ferramentas do jogo, herdando de Item e permitindo uso polimórfico

const Item = require('./item');

class Ferramenta extends Item {
    /**
     * Construtor da Ferramenta
     * @param {string} name - Nome da ferramenta
     * @param {string} description - Descrição da ferramenta
     * @param {number} usos - Quantidade de usos disponíveis (Infinity = ilimitado)
     * @param {function|null} useFunction - Função que define a ação da ferramenta sobre um alvo
     */
    constructor(name, description, usos = Infinity, useFunction = null) {
        super(name, description); // Herda name e description da classe Item
        this.usos = usos; // Número de usos restantes
        this.useFunction = useFunction; // Função de interação com alvo
    }

    /**
     * Método que aplica a ferramenta a um alvo
     * @param {Item|Objeto|Ferramenta|any} target - Alvo da ferramenta
     * @returns {boolean} - true se a ação foi bem-sucedida, false caso contrário
     */
    usar(target) {
        if (this.usos <= 0) {
            console.log(`${this.name} não pode mais ser usada.`);
            return false;
        }

        if (this.useFunction) {
            const result = this.useFunction(target); // Executa ação customizada
            if (result) this.usos--; // Diminui número de usos se ação foi bem-sucedida
            return result;
        }

        console.log("Nada aconteceu."); // Caso não tenha função definida
        return false;
    }
}

module.exports = { Ferramenta };