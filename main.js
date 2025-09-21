// main.js
// Arquivo principal que inicia o jogo e gerencia a interação com o jogador via terminal

const Game = require('./game');
const readline = require('readline');

const game = new Game();
game.setup();
game.start();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("\nComandos disponíveis:");
console.log("- ir <direção> (norte, leste, sul, oeste)");
console.log("- pegar <item>");
console.log("- usar <ferramenta> <objeto>");
console.log("- inventario");
console.log("- descartar <item>");
console.log("- sair\n");

function promptUser() {
    if (game.fim) {
        console.log("Fim do jogo!");
        rl.close();
        return;
    }

    rl.question("Digite um comando: ", (cmd) => {
        const partes = cmd.trim().split(' ');
        const comando = partes[0].toLowerCase();

        if (comando === "sair") {
            console.log("Saindo do jogo...");
            rl.close();
            return;
        }

        if (comando === "ir") {
            game.move(partes[1]);
        } else if (comando === "pegar") {
            const itemName = partes.slice(1).join(' ');
            game.take(itemName);
        } else if (comando === "usar") {
            if (partes.length < 3) {
                console.log("Uso incorreto! Formato: usar <ferramenta> <objeto>");
            } else {
                const args = partes.slice(1);
                let toolName = "";
                let targetName = "";

                for (let i = args.length; i > 0; i--) {
                    const possibleTool = args.slice(0, i).join(' ');
                    if (game.player.hasItem(possibleTool)) {
                        toolName = possibleTool;
                        targetName = args.slice(i).join(' ');
                        break;
                    }
                }

                if (!toolName) {
                    console.log("Você não possui essa ferramenta.");
                } else if (!targetName) {
                    console.log("Alvo inválido!");
                } else {
                    game.use(toolName, targetName);
                }
            }
        } else if (comando === "inventario") {
            game.showInventory();
        } else if (comando === "descartar") {
            const itemName = partes.slice(1).join(' ');
            if (!itemName) {
                console.log("Uso incorreto! Formato: descartar <item>");
            } else {
                game.discard(itemName);
            }
        } else {
            console.log("Comando inválido!");
        }

        promptUser();
    });
}

promptUser();