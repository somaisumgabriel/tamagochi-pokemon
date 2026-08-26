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

// Elemento para exibir mensagens na tela
const msgEl = document.getElementById("mensagem");

// Carrega o Pokémon salvo no localStorage
const pokemonSalvo = JSON.parse(localStorage.getItem("pokemonEscolhido"));

if (pokemonSalvo) {

    const elNome = document.getElementById("nomePokemon");
    const elImg = document.getElementById("imagemPokemon");

    if (elNome) elNome.textContent = pokemonSalvo.nome;
    if (elImg) elImg.src = pokemonSalvo.imagem;

} else {

    // Ninguém escolheu um Pokémon ainda:
    // manda a pessoa de volta pra tela de escolha.

    window.location.href = "index.html";
}

// Atualiza os valores e as barras visuais no HTML
function atualizarTela() {

    // Atualiza os textos numéricos
    setTex("valorVida", status.vida);
    setTex("valorFome", status.fome);
    setTex("valorHumor", status.humor);
    setTex("valorEnergia", status.energia);
    setTex("valorSono", status.sono);
    setTex("nivel", status.nivel);
    setTex("experiencia", status.xp);

    // Atualiza o preenchimento das barras visuais (0% a 100%)
    setBarra("barraVida", status.vida);
    setBarra("barraFome", status.fome);
    setBarra("barraHumor", status.humor);
    setBarra("barraEnergia", status.energia);
    setBarra("barraSono", status.sono);
    setBarra("barraXP", status.xp);
}

function setTex(id, valor) {
    const el = document.getElementById(id);
    if (el) el.textContent = valor;
}

function setBarra(id, valor) {
    const el = document.getElementById(id);
    if (el) el.style.width = Math.min(100, Math.max(0, valor)) + "%";
}

function exibirMensagem(texto) {
    if (msgEl) msgEl.textContent = texto;
}

// Ações dos Botões
function alimentar() {
    status.fome = Math.max(0, status.fome - 20);
    status.energia = Math.min(100, status.energia + 5);
    exibirMensagem("🍖 Nham! Seu Pokémon se alimentou.");
    ganharXP(10);
    atualizarTela();
}

function brincar() {

    if (status.energia < 15) {
        exibirMensagem("😴 Seu Pokémon está cansado demais para brincar!");
        return;
    }

    status.humor = Math.min(100, status.humor + 20);
    status.energia = Math.max(0, status.energia - 15);
    status.fome = Math.min(100, status.fome + 10);
    exibirMensagem("🎾 Que divertido! Vocês brincaram bastante.");
    ganharXP(15);
    atualizarTela();
}

function dormir() {
    status.energia = 100;
    status.sono = 0;
    status.fome = Math.min(100, status.fome + 15);
    exibirMensagem("💤 Zzz... Seu Pokémon tirou uma soneca e recuperou as energias!");
    atualizarTela();
}

function carinho() {
    status.humor = Math.min(100, status.humor + 10);
    exibirMensagem("❤️ Seu Pokémon adorou o carinho!");
    ganharXP(5);
    atualizarTela();
}

function banho() {
    status.humor = Math.min(100, status.humor + 5);
    exibirMensagem("🚿 Seu Pokémon está limpinho e cheiroso!");
    ganharXP(5);
    atualizarTela();
}

function ganharXP(qtd) {

    status.xp += qtd;

    if (status.xp >= 100) {
        status.nivel += 1;
        status.xp -= 100;
        exibirMensagem(`🎉 Parabéns! Seu Pokémon subiu para o Nível ${status.nivel}!`);
    }
}

function voltarEscolha() {
    window.location.href = "index.html";
}

// A fome e o sono aumentam aos poucos com o tempo,
// pra dar vida ao Tamagotchi mesmo sem clicar em nada.
setInterval(function () {

    status.fome = Math.min(100, status.fome + 2);
    status.sono = Math.min(100, status.sono + 2);
    status.energia = Math.max(0, status.energia - 1);

    if (status.fome >= 90) {
        status.vida = Math.max(0, status.vida - 2);
    }

    atualizarTela();

}, 15000);

// Renderiza a interface inicial
atualizarTela();
