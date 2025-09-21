// room.js
// Classe que representa uma sala do jogo, contendo itens e saídas para outras salas

class Room {
    /**
     * Construtor da sala
     * @param {string} name - Nome da sala
     * @param {string} description - Descrição da sala
     */
    constructor(name, description) {
        this.name = name; // Nome da sala
        this.description = description; // Descrição detalhada
        this.items = []; // Lista de itens/ferramentas presentes na sala
        this.exits = {}; // Conexões com outras salas: { norte: salaObj, leste: salaObj, ... }
    }

    /**
     * Define uma saída da sala para outra sala
     * @param {string} direction - Direção da saída (norte, sul, leste, oeste)
     * @param {Room} room - Sala de destino
     */
    setExit(direction, room) {
        this.exits[direction] = room;
    }

    /**
     * Adiciona um item ou objeto à sala
     * @param {Item|Ferramenta|Objeto} item - Item a ser adicionado
     */
    addItem(item) {
        this.items.push(item);
    }

    /**
     * Remove um item da sala pelo nome
     * @param {string} itemName - Nome do item a remover
     */
    removeItem(itemName) {
        this.items = this.items.filter((item) => item.name !== itemName);
    }

    /**
     * Mostra a descrição completa da sala, incluindo itens e saídas
     */
    describe() {
        console.log(`\n${this.name}`); // Título da sala
        console.log(this.description); // Descrição detalhada

        // Lista itens presentes
        if (this.items.length > 0) {
            console.log("Itens nesta sala:");
            this.items.forEach((item) => console.log(`- ${item.name}`));
        } else {
            console.log("Não há itens aqui.");
        }

        // Lista saídas disponíveis
        console.log("Saídas disponíveis: " + Object.keys(this.exits).join(", "));
    }
}

module.exports = Room;