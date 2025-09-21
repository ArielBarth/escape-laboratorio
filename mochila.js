// mochila.js
class Mochila {
    #capacidade;
    #itens;

    constructor(capacidade = 5) {
        this.#capacidade = capacidade;
        this.#itens = [];
    }

    guarda(item) {
        if (this.#itens.length >= this.#capacidade) {
            console.log("Mochila cheia!");
            return false;
        }
        this.#itens.push(item);
        console.log(`${item.name} adicionado à mochila.`);
        return true;
    }

    pega(nome) {
        return this.#itens.find(i => i.name === nome) || null;
    }

    tem(nome) {
        return this.#itens.some(i => i.name === nome);
    }

    inventario() {
        if (this.#itens.length === 0) {
            console.log("Inventário vazio.");
        } else {
            console.log("Inventário: " + this.#itens.map(i => i.name).join(", "));
        }
    }

    remove(nome) {
        const index = this.#itens.findIndex(i => i.name === nome);
        if (index !== -1) {
            const removido = this.#itens.splice(index, 1)[0];
            console.log(`${removido.name} foi removido da mochila.`);
            return true;
        } else {
            console.log(`${nome} não está na mochila.`);
            return false;
        }
    }

    setCapacidade(novaCapacidade) {
        if (novaCapacidade < this.#itens.length) {
            console.log("Não é possível reduzir abaixo do número de itens atuais.");
            return false;
        }
        this.#capacidade = novaCapacidade;
        console.log(`Capacidade da mochila ajustada para ${this.#capacidade}.`);
        return true;
    }
}

module.exports = Mochila;