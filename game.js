// game.js
const Player = require("./player");
const Room = require("./room");
const Ferramenta = require("./ferramenta");
const Chave = require("./chave");
const Consumivel = require("./consumivel");
const Objeto = require("./objeto");

class Game {
    #player;
    #rooms;
    #currentRoom;
    #fim;
    #flags;

    constructor(playerName = "Jogador") {
        this.#player = new Player(playerName);
        this.#rooms = {};
        this.#currentRoom = null;
        this.#fim = false;
        this.#flags = {
            energiaRestaurada: false,
            cofreAberto: false
        };
    }

    get fim() {
        return this.#fim;
    }

    get player() {
        return this.#player;
    }

    get currentRoom() {
        return this.#currentRoom;
    }

    setup() {
        // ---------- Salas ----------
        const hall = new Room("Hall", "Você está no hall principal do laboratório.");
        const biblioteca = new Room("Biblioteca", "Uma sala cheia de livros e um terminal antigo.");
        const cozinha = new Room("Cozinha", "Panelas e utensílios espalhados.");
        const jardim = new Room("Jardim", "Plantas e um painel de energia.");
        const porao = new Room("Porão", "Um cofre trancado no canto.");
        const saida = new Room("Saída", "A porta final que leva à liberdade.");

        // ---------- Conexões ----------
        hall.setExit("norte", biblioteca);
        hall.setExit("leste", cozinha);
        biblioteca.setExit("sul", hall);
        biblioteca.setExit("leste", jardim);
        cozinha.setExit("oeste", hall);
        jardim.setExit("oeste", biblioteca);
        jardim.setExit("sul", porao);
        porao.setExit("norte", jardim);
        porao.setExit("leste", saida);
        saida.setExit("oeste", porao);

        // ---------- Ferramentas e Consumíveis ----------
        const cartao = new Ferramenta("cartão magnético", "Ativa o terminal da Biblioteca", Infinity, (target) => {
            if (target.name === "Terminal da Biblioteca") {
                console.log("Terminal ativado!");
                return true;
            }
            return false;
        });

        const chaveVelha = new Chave("chave velha", "Abre o Porão", "Porão");
        const fusivel = new Consumivel("fusível", "Restaura energia do Porão", (target) => {
            if (target.name === "Painel de Energia") {
                console.log("Energia restaurada!");
                this.#flags.energiaRestaurada = true;
                return true;
            }
            return false;
        });

        // ---------- Objetos ----------
        const cofre = new Objeto("Cofre", "Cofre trancado", "Cofre aberto com duas chaves dentro");
        const chaveVerdadeira = new Chave("chave verdadeira", "Abre a porta final", "Porta Final");
        const chaveFalsa = new Chave("chave falsa", "Parecia ser a chave certa...", "Porta Final");
        cofre.chaves = [chaveVerdadeira, chaveFalsa];

        const portaFinal = new Objeto("Porta Final", "Porta trancada", "Porta aberta - você venceu!");

        // ---------- Distribuição ----------
        biblioteca.addItem(cartao);
        cozinha.addItem(chaveVelha);
        jardim.addItem(fusivel);
        porao.addItem(cofre);
        saida.addItem(portaFinal);

        // ---------- Salas no jogo ----------
        this.#rooms = { hall, biblioteca, cozinha, jardim, porao, saida };
        this.#currentRoom = hall;
    }

    start() {
        console.log("Bem-vindo ao Escape do Laboratório - Fase 2!");
        this.#currentRoom.describe();
    }

    move(direction) {
        const nextRoom = this.#currentRoom.getExit(direction);
        if (nextRoom) {
            this.#currentRoom = nextRoom;
            this.#currentRoom.describe();
        } else {
            console.log("Não é possível ir nessa direção.");
        }
    }

    take(itemName) {
        const item = this.#currentRoom.getItemByName(itemName);
        if (item) {
            this.#player.addItem(item);
            this.#currentRoom.removeItem(itemName);
        } else {
            console.log("Esse item não está aqui.");
        }
    }

    use(itemName, targetName) {
        const item = this.#player.getItem(itemName);
        if (!item) {
            console.log("Você não possui esse item.");
            return;
        }

        let target = this.#currentRoom.getItemByName(targetName) || { name: targetName };

        // Tratamento especial para cofre
        if (target.name === "Cofre" && itemName === "chave velha") {
            console.log("Cofre destrancado!");
            target.acaoOk = true;
            this.#flags.cofreAberto = true;
            target.chaves.forEach(k => this.#player.addItem(k));
            return;
        }

        // Tratamento da porta final
        if (target.name === "Porta Final") {
            if (itemName === "chave verdadeira") {
                console.log("Parabéns! Você abriu a porta com a chave verdadeira e venceu o jogo!");
            } else {
                console.log("Você tentou abrir a porta com a chave falsa... Preso para sempre!");
            }
            this.#fim = true;
            return;
        }

        if (typeof item.usar === "function") {
            if (!item.usar(target)) {
                console.log("Nada aconteceu.");
            }
        } else {
            console.log("Nada aconteceu.");
        }
    }

    showInventory() {
        this.#player.showInventory();
    }

    discard(itemName) {
        this.#player.removeItem(itemName);
    }
}

module.exports = Game;