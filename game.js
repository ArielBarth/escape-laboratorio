// game.js
// Classe principal que controla toda a lógica do jogo (Fase 2)

const Player = require("./player");
const Room = require("./room");
const { Ferramenta } = require("./ferramenta");
const Objeto = require("./objeto");

class Game {
    constructor(playerName = "Jogador") {
        this.player = new Player(playerName);
        this.rooms = {};
        this.currentRoom = null;
        this.fim = false;
        this.energiaRestaurada = false;
        this.cofreAberto = false;
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

        // ---------- Ferramentas ----------
        const cartao = new Ferramenta(
            "cartão magnético",
            "Ativa o terminal da Biblioteca",
            Infinity,
            (target) => {
                if (target.name === "Terminal da Biblioteca") {
                    console.log("Terminal ativado!");
                    return true;
                }
                console.log("Nada aconteceu.");
                return false;
            }
        );

        const chaveVelha = new Ferramenta(
            "chave velha",
            "Abre o Porão",
            Infinity,
            (target) => {
                if (target.name === "Porão") {
                    console.log("Porão destrancado!");
                    return true;
                }
                console.log("Nada aconteceu.");
                return false;
            }
        );

        const fusivel = new Ferramenta(
            "fusível",
            "Restaura energia do Porão",
            Infinity,
            (target) => {
                if (target.name === "Painel de Energia") {
                    console.log("Energia restaurada!");
                    this.energiaRestaurada = true;
                    return true;
                }
                console.log("Nada aconteceu.");
                return false;
            }
        );

        // ---------- Objetos ----------
        const cofre = new Objeto("Cofre", "Cofre trancado", "Cofre aberto com duas chaves dentro");
        const chaveVerdadeira = new Ferramenta("chave verdadeira", "Abre a porta final", 1);
        const chaveFalsa = new Ferramenta("chave falsa", "Parecia ser a chave certa...", 1);
        cofre.chaves = [chaveVerdadeira, chaveFalsa];

        const portaFinal = new Objeto("Porta Final", "Porta trancada", "Porta aberta - você venceu!");

        // ---------- Distribuição ----------
        biblioteca.addItem(cartao);
        cozinha.addItem(chaveVelha);
        jardim.addItem(fusivel);
        porao.addItem(cofre);
        saida.addItem(portaFinal);

        // ---------- Salas no jogo ----------
        this.rooms = { hall, biblioteca, cozinha, jardim, porao, saida };
        this.currentRoom = hall;
    }

    start() {
        console.log("Bem-vindo ao Escape do Laboratório - Fase 2!");
        this.currentRoom.describe();
    }

    move(direction) {
        const nextRoom = this.currentRoom.exits[direction];
        if (nextRoom) {
            this.currentRoom = nextRoom;
            this.currentRoom.describe();
        } else {
            console.log("Não é possível ir nessa direção.");
        }
    }

    take(itemName) {
        const item = this.currentRoom.items.find(i => i.name === itemName);
        if (item) {
            this.player.addItem(item);
            this.currentRoom.removeItem(itemName);
        } else {
            console.log("Esse item não está aqui.");
        }
    }

    use(toolName, targetName) {
        const tool = this.player.getItem(toolName);
        if (!tool) {
            console.log("Você não possui essa ferramenta.");
            return;
        }

        const target = this.currentRoom.items.find(i => i.name === targetName) || { name: targetName };

        if (target instanceof Objeto && target.name === "Cofre") {
            if (tool.name === "chave velha") {
                console.log("Cofre destrancado!");
                target.acaoOk = true;
                this.cofreAberto = true;
                target.chaves.forEach(k => this.player.addItem(k));
                return;
            }
        }

        if (target instanceof Objeto && target.name === "Porta Final") {
            if (tool.name === "chave verdadeira") {
                console.log("Parabéns! Você abriu a porta com a chave verdadeira e venceu o jogo!");
            } else {
                console.log("Você tentou abrir a porta com a chave falsa... Preso para sempre!");
            }
            this.fim = true;
            return;
        }

        if (tool.usar(target)) {
            return;
        }

        console.log("Nada aconteceu.");
    }

    showInventory() {
        this.player.showInventory();
    }

    discard(itemName) {
        this.player.removeItem(itemName);
    }
}

module.exports = Game;