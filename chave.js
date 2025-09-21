//chave.js
const Item = require('./item');

class Chave extends Item {
    constructor(name, description, targetName) {
        super(name, description);
        this.targetName = targetName; // objeto que essa chave destranca
    }

    usar(target) {
        if (target.name === this.targetName) {
            console.log(`${target.name} destrancado(a)!`);
            return true;
        } else {
            console.log("Chave não funciona aqui.");
            return false;
        }
    }
}

module.exports = Chave;