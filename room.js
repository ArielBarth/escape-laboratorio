// room.js
class Room {
    #name;
    #description;
    #items;
    #exits;

    constructor(name, description) {
        this.#name = name;
        this.#description = description;
        this.#items = [];
        this.#exits = {};
    }

    get name() {
        return this.#name;
    }

    get description() {
        return this.#description;
    }

    get items() {
        return this.#items;
    }

    get exits() {
        return this.#exits;
    }

    setExit(direction, room) {
        this.#exits[direction] = room;
    }

    addItem(item) {
        this.#items.push(item);
    }

    removeItem(itemName) {
        this.#items = this.#items.filter(i => i.name !== itemName);
    }

    describe() {
        console.log(`\n${this.#name}`);
        console.log(this.#description);

        if (this.#items.length > 0) {
            console.log("Itens nesta sala:");
            this.#items.forEach(i => console.log(`- ${i.name}`));
        } else {
            console.log("Não há itens aqui.");
        }

        const directions = Object.keys(this.#exits);
        console.log("Saídas disponíveis: " + (directions.length > 0 ? directions.join(", ") : "nenhuma"));
    }

    getItemByName(name) {
        return this.#items.find(i => i.name === name) || null;
    }

    getExit(direction) {
        return this.#exits[direction] || null;
    }
}

module.exports = Room;