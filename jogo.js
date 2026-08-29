// ==========================================
// TAMAGOTCHI POKÉMON - LÓGICA DO JOGO
// ==========================================

const TEMPO_COOLDOWN = 5 * 60 * 1000; // 5 minutos em milissegundos

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

// Carrega os dados do Pokémon escolhido no localStorage
const pokemonSalvo = JSON.parse(localStorage.getItem("pokemonEscolhido"));

// Chave usada para salvar o apelido/nome personalizado
const CHAVE_APELIDO = "pokemonApelido";

// Ações que possuem cooldown de 5 minutos
const ACOES = ["alimentar", "brincar", "dormir", "carinho", "banho"];

// Guarda o texto original de cada botão para poder restaurar depois do cooldown
const textoOriginalBotao = {};

// ==========================================
// NOME PERSONALIZADO
// ==========================================

function nomeExibicao() {
    const apelido = localStorage.getItem(CHAVE_APELIDO);
    if (apelido && apelido.trim() !== "") {
        return apelido;
    }
    return pokemonSalvo ? pokemonSalvo.nome : "Meu Pokémon";
}

function atualizarNomeNaTela() {
    const elNome = document.getElementById("nomePokemon");
    if (elNome) elNome.textContent = nomeExibicao();
}

function renomearPokemon() {
    const nomeAtual = nomeExibicao();
    const novoNome = prompt("Como você quer chamar seu Pokémon?", nomeAtual);

    if (novoNome === null) return; // usuário cancelou

    const nomeLimpo = novoNome.trim();

    if (nomeLimpo === "") {
        localStorage.removeItem(CHAVE_APELIDO);
    } else {
        localStorage.setItem(CHAVE_APELIDO, nomeLimpo);
    }

    atualizarNomeNaTela();
}

// Atualiza a tela com o Pokémon selecionado
if (pokemonSalvo) {
    const elImg = document.getElementById("imagemPokemon");
    if (elImg) elImg.src = pokemonSalvo.imagem;
}
atualizarNomeNaTela();

// ==========================================
// ATUALIZAÇÃO DA TELA (status e barras)
// ==========================================

function atualizarTela() {
    document.getElementById("valorVida").textContent = status.vida;
    document.getElementById("valorFome").textContent = status.fome;
    document.getElementById("valorHumor").textContent = status.humor;
    document.getElementById("valorEnergia").textContent = status.energia;
    document.getElementById("valorSono").textContent = status.sono;

    document.getElementById("nivel").textContent = status.nivel;
    document.getElementById("experiencia").textContent = status.xp;

    document.getElementById("barraVida").style.width = status.vida + "%";
    document.getElementById("barraFome").style.width = status.fome + "%";
    document.getElementById("barraHumor").style.width = status.humor + "%";
    document.getElementById("barraEnergia").style.width = status.energia + "%";
    document.getElementById("barraSono").style.width = status.sono + "%";
    document.getElementById("barraXP").style.width = status.xp + "%";
}

function mostrarMensagem(texto) {
    const elMensagem = document.getElementById("mensagem");
    if (elMensagem) elMensagem.textContent = texto;
}

// ==========================================
// FUNÇÕES DOS BOTÕES (ações do Pokémon)
// ==========================================

function alimentar() {
    if (emCooldown("alimentar")) return;

    status.fome = Math.max(0, status.fome - 20);
    status.energia = Math.min(100, status.energia + 5);
    ganharXP(10);
    mostrarMensagem("Nhom nhom! Seu Pokémon comeu bem! 🍖");
    atualizarTela();
    iniciarCooldown("alimentar");
}

function brincar() {
    if (emCooldown("brincar")) return;

    if (status.energia < 15) {
        alert("Seu Pokémon está muito cansado para brincar!");
        return;
    }
    status.humor = Math.min(100, status.humor + 20);
    status.energia = Math.max(0, status.energia - 15);
    status.fome = Math.min(100, status.fome + 10);
    ganharXP(15);
    mostrarMensagem("Seu Pokémon adorou brincar! 🎾");
    atualizarTela();
    iniciarCooldown("brincar");
}

function dormir() {
    if (emCooldown("dormir")) return;

    status.energia = 100;
    status.sono = 0;
    status.fome = Math.min(100, status.fome + 15);
    mostrarMensagem("Seu Pokémon dormiu e recuperou as energias! 💤");
    atualizarTela();
    iniciarCooldown("dormir");
}

function carinho() {
    if (emCooldown("carinho")) return;

    status.humor = Math.min(100, status.humor + 10);
    ganharXP(5);
    mostrarMensagem("Seu Pokémon adorou o carinho! ❤️");
    atualizarTela();
    iniciarCooldown("carinho");
}

function banho() {
    if (emCooldown("banho")) return;

    status.humor = Math.min(100, status.humor + 5);
    ganharXP(5);
    mostrarMensagem("Seu Pokémon ficou limpinho! 🚿");
    atualizarTela();
    iniciarCooldown("banho");
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

// alias, pois o botão "Escolher outro Pokémon" chama voltarEscolha()
function voltarEscolha() {
    trocarPokemon();
}

// ==========================================
// SISTEMA DE COOLDOWN (5 minutos por ação)
// ==========================================

function chaveCooldown(acao) {
    const idPokemon = pokemonSalvo ? pokemonSalvo.nome : "padrao";
    return `cooldown_${idPokemon}_${acao}`;
}

function emCooldown(acao) {
    const disponivelEm = Number(localStorage.getItem(chaveCooldown(acao)) || 0);
    return Date.now() < disponivelEm;
}

function iniciarCooldown(acao) {
    const disponivelEm = Date.now() + TEMPO_COOLDOWN;
    localStorage.setItem(chaveCooldown(acao), disponivelEm);
    atualizarBotaoCooldown(acao);
}

function formatarTempo(ms) {
    const totalSegundos = Math.max(0, Math.ceil(ms / 1000));
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;
    return `${minutos}:${String(segundos).padStart(2, "0")}`;
}

function atualizarBotaoCooldown(acao) {
    const botao = document.getElementById("btn-" + acao);
    if (!botao) return;

    const disponivelEm = Number(localStorage.getItem(chaveCooldown(acao)) || 0);
    const restante = disponivelEm - Date.now();

    if (restante > 0) {
        botao.disabled = true;
        botao.classList.add("em-cooldown");
        botao.textContent = `⏳ ${formatarTempo(restante)}`;
    } else {
        botao.disabled = false;
        botao.classList.remove("em-cooldown");
        botao.textContent = textoOriginalBotao[acao];
    }
}

function iniciarRelogioCooldowns() {
    ACOES.forEach((acao) => {
        const botao = document.getElementById("btn-" + acao);
        if (botao) {
            textoOriginalBotao[acao] = botao.textContent.trim();
        }
        atualizarBotaoCooldown(acao);
    });

    setInterval(() => {
        ACOES.forEach(atualizarBotaoCooldown);
    }, 1000);
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================

atualizarTela();
iniciarRelogioCooldowns();

const btnEditarNome = document.getElementById("btnEditarNome");
if (btnEditarNome) {
    btnEditarNome.addEventListener("click", renomearPokemon);
}
