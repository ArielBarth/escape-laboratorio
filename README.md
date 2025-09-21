# 🧪 Escape do Laboratório - Fase 2
Bem-vindo(a) ao **Escape do Laboratório - Fase 2**, um jogo de aventura em texto, onde o objetivo é escapar de um misterioso laboratório encontrando a **chave final**. Prepare-se para explorar salas, coletar objetos, resolver enigmas e testar sua lógica!

## 🎯 Objetivo do Jogo
Você está preso(a) no laboratório e precisa encontrar a **chave verdadeira** para escapar. Para isso:

* Explore diferentes salas: Hall, Biblioteca, Cozinha, Jardim, Porão e Saída.
* Colete ferramentas e objetos, como cartão magnético, fusível e chaves.
* Resolva enigmas, incluindo ativar o **Terminal da Biblioteca** e restaurar energia no Painel do Jardim.
* Abra a **Porta Final** usando a chave verdadeira para vencer o jogo.

## 📂 Estrutura do Projeto
escape-laboratorio/
├─ main.js          # Arquivo principal para rodar o jogo  
├─ game.js          # Lógica do jogo  
├─ player.js        # Classe do jogador  
├─ room.js          # Definição das salas  
├─ item.js          # Classe base para itens  
├─ objeto.js        # Objetos interativos  
├─ ferramenta.js    # Ferramentas que herdam de Item  
├─ mochila.js       # Inventário privado do jogador  
└─ README.md        # Este arquivo


> Cada arquivo tem sua função: `main.js` é o ponto de entrada, enquanto os demais cuidam da lógica, salas e itens do jogo.

## ⚡ Requisitos
Para jogar, você precisa ter o **Node.js** instalado.
Você pode verificar se já tem instalado com:


node -v

Se não tiver, baixe aqui: [Node.js](https://nodejs.org/)

## ▶ Como Jogar

1. **Entre na pasta do projeto:**
cd escape-laboratorio


2. **Execute o jogo:**
node main.js


3. **Siga as instruções** no terminal, explorando as salas, coletando objetos e resolvendo enigmas até encontrar a **chave verdadeira** e abrir a **Porta Final**.

## 🕹 Comandos
Durante o jogo, você poderá usar comandos como:

* `ir <direção>` → Para se deslocar entre salas (norte, sul, leste, oeste).
* `pegar <item>` → Para coletar ferramentas ou objetos.
* `inventario` → Para ver os itens que você possui.
* `usar <ferramenta> <objeto>` → Para usar ferramentas nos objetos e resolver enigmas.
* `sair` → Para encerrar o jogo.

**Exemplo de sequência de comandos para vencer:**
ir norte
pegar cartão magnético
usar cartão magnético Terminal da Biblioteca
ir sul
ir leste
pegar chave velha
ir oeste
ir norte
ir leste
pegar fusível
usar fusível Painel de Energia
ir sul
usar chave velha Cofre
ir leste
usar chave verdadeira Porta Final


## 📝 Exemplo de Jogada
Você está no Hall.
Saídas: norte, leste

> ir norte
> Você entrou na Biblioteca. Há um terminal estranho aqui.

> pegar cartão magnético
> Você pegou: cartão magnético

> usar cartão magnético Terminal da Biblioteca
> O terminal foi ativado!

> ir sul
> Você voltou para o Hall

> ir leste
> Você entrou na Cozinha. Há uma chave velha aqui.

> pegar chave velha
> Você pegou: chave velha

> ir oeste
> Você voltou para o Hall

> ir norte → ir leste
> Você chegou ao Jardim. Há um fusível e um Painel de Energia.

> pegar fusível
> Você pegou: fusível

> usar fusível Painel de Energia
> Energia restaurada!

> ir sul
> Você entrou no Porão. Há um Cofre trancado.

> usar chave velha Cofre
> Cofre destrancado! Você encontrou a chave verdadeira e a chave falsa.

> ir leste
> Você chegou à Saída.

> usar chave verdadeira Porta Final
> Você abriu a Porta Final e venceu o jogo! 🎉