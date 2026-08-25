// ==========================================
// TAMAGOTCHI POKÉMON - LÓGICA DO JOGO
// ==========================================

// Estado inicial do Pokémon
let status = {
    vida: 100,
    fome: 50,
    humor: 50,
    energia: 100,
    sono: 0,
    nivel: 1,
    xp: 0
};

// Carrega os dados do Pokémon salvo no localStorage
const pokemonSalvo = JSON.parse(localStorage.getItem("pokemonEscolhido"));

// Atualiza a tela com o Pokémon selecionado
if (pokemonSalvo) {
    const elNome = document.getElementById("nomePokemon");
    const elImg = document.getElementById("imagemPokemon");
    
    if (elNome) elNome.textContent = pokemonSalvo.nome;
    if (elImg) elImg.src = pokemonSalvo.imagem;
}

// Atualiza a exibição dos valores na tela
function atualizarTela() {
    for (let chave in status) {
        const elemento = document.getElementById(chave);
        if (elemento) {
            elemento.textContent = status[chave];
        }
    }
}

// Funções dos Botões
function alimentar() {
    status.fome = Math.max(0, status.fome - 20);
    status.energia = Math.min(100, status.energia + 5);
    ganharXP(10);
    atualizarTela();
}

function brincar() {
    if (status.energia < 15) {
        alert("Seu Pokémon está muito cansado para brincar!");
        return;
    }
    status.humor = Math.min(100, status.humor + 20);
    status.energia = Math.max(0, status.energia - 15);
    status.fome = Math.min(100, status.fome + 10);
    ganharXP(15);
    atualizarTela();
}

function dormir() {
    status.energia = 100;
    status.sono = 0;
    status.fome = Math.min(100, status.fome + 15);
    atualizarTela();
}

function carinho() {
    status.humor = Math.min(100, status.humor + 10);
    ganharXP(5);
    atualizarTela();
}

function banho() {
    status.humor = Math.min(100, status.humor + 5);
    ganharXP(5);
    atualizarTela();
}

function ganharXP(qtd) {
    status.xp += qtd;
    if (status.xp >= 100) {
        status.nivel += 1;
        status.xp -= 100;
        alert(`Parabéns! Seu Pokémon subiu para o Nível ${status.nivel}!`);
    }
}

function trocarPokemon() {
    window.location.href = "index.html";
}

// Inicializa a tela
atualizarTela();
