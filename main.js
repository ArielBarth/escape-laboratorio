// main.js
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
console.log("- usar <item> <alvo>");
console.log("- inventario");
console.log("- descartar <item>");
console.log("- sair\n");

function promptUser() {
    if (game.fim) {
        console.log("Fim do jogo!");
        rl.close();
        return;
    }

    rl.question("Digite um comando: ", (input) => {
        const [comando, ...args] = input.trim().split(' ');

        switch (comando.toLowerCase()) {
            case 'sair':
                console.log("Saindo do jogo...");
                rl.close();
                return;

            case 'ir':
                if (args.length === 0) {
                    console.log("Uso incorreto! Formato: ir <direção>");
                } else {
                    game.move(args[0].toLowerCase());
                }
                break;

            case 'pegar':
                if (args.length === 0) {
                    console.log("Uso incorreto! Formato: pegar <item>");
                } else {
                    const itemName = args.join(' ');
                    game.take(itemName);
                }
                break;

            case 'usar':
                if (args.length < 2) {
                    console.log("Uso incorreto! Formato: usar <item> <alvo>");
                } else {
                    // Determinar item e alvo dinamicamente
                    let itemName = '';
                    let targetName = '';
                    for (let i = args.length; i > 0; i--) {
                        const possibleItem = args.slice(0, i).join(' ');
                        if (game.player.hasItem(possibleItem)) {
                            itemName = possibleItem;
                            targetName = args.slice(i).join(' ');
                            break;
                        }
                    }

                    if (!itemName) {
                        console.log("Você não possui esse item.");
                    } else if (!targetName) {
                        console.log("Alvo inválido!");
                    } else {
                        game.use(itemName, targetName);
                    }
                }
                break;

            case 'inventario':
                game.showInventory();
                break;

            case 'descartar':
                if (args.length === 0) {
                    console.log("Uso incorreto! Formato: descartar <item>");
                } else {
                    const itemName = args.join(' ');
                    game.discard(itemName);
                }
                break;

            default:
                console.log("Comando inválido!");
        }

        promptUser();
    });
}

promptUser();