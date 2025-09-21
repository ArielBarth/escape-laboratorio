// mochila.js
class Mochila {
    constructor(capacidade = 5) {
        this.capacidade = capacidade;
        this.itens = [];
    }

    guarda(ferramenta) {
        if (this.itens.length >= this.capacidade) {
            console.log("Mochila cheia!");
            return false;
        }
        this.itens.push(ferramenta);
        console.log(`${ferramenta.name} adicionado à mochila.`);
        return true;
    }

    pega(nome) {
        return this.itens.find((f) => f.name === nome) || null;
    }

    tem(nome) {
        return this.itens.some((f) => f.name === nome);
    }

    inventario() {
        if (this.itens.length === 0) {
            console.log("Inventário vazio.");
        } else {
            console.log("Inventário: " + this.itens.map((f) => f.name).join(", "));
        }
    }

    remove(nome) {
        const index = this.itens.findIndex((f) => f.name === nome);
        if (index !== -1) {
            const removido = this.itens.splice(index, 1)[0];
            console.log(`${removido.name} foi removido da mochila.`);
            return true;
        } else {
            console.log(`${nome} não está na mochila.`);
            return false;
        }
    }
}

module.exports = Mochila;