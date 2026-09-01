// ==========================================
// BATALHA POKÉMON — QUICK TIME EVENT
// ==========================================


// ==========================================
// TABELA DE SPRITES (mesma fonte usada em
// script.js, pela PokeAPI)
// ==========================================

function urlImagemPokemon(numero) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numero}.png`;
}

const NUMERO_POR_NOME = {
    "bulbasaur": 1,
    "charmander": 4,
    "squirtle": 7,
    "pikachu": 25,
    "chikorita": 152,
    "cyndaquil": 155,
    "totodile": 158,
    "treecko": 252,
    "torchic": 255,
    "mudkip": 258,
    "turtwig": 387,
    "chimchar": 390,
    "piplup": 393,
    "snivy": 495,
    "tepig": 498,
    "oshawott": 501,
    "chespin": 650,
    "fennekin": 653,
    "froakie": 656,
    "rowlet": 722,
    "litten": 725,
    "popplio": 728,
    "grookey": 810,
    "scorbunny": 813,
    "sobble": 816,
    "sprigatito": 906,
    "fuecoco": 909,
    "quaxly": 912
};

function imagemPara(nomePokemon) {
    const chave = (nomePokemon || "").toLowerCase().trim();
    const numero = NUMERO_POR_NOME[chave] || NUMERO_POR_NOME["pikachu"];
    return urlImagemPokemon(numero);
}

function nomeExibicao(nomePokemon) {
    if (!nomePokemon) return "Pikachu";
    return nomePokemon.charAt(0).toUpperCase() + nomePokemon.slice(1).toLowerCase();
}


// ==========================================
// CONFIGURAÇÃO DA BATALHA
// ==========================================

const cfg = {
    maxHp: 100,
    turnosPorLado: 5,
    danoAtaque: { perfeito: 26, bom: 16, falha: 6 },
    defesa: { base: 20, perfeito: 2, bom: 10 },
    larguraPerfeito: 7,
    larguraBom: 24
};


// ==========================================
// ESTADO
// ==========================================

const state = {
    jogadorNome: "Pikachu",
    jogadorNivel: 1,
    inimigoNome: "Pikachu",
    jogadorHp: cfg.maxHp,
    inimigoHp: cfg.maxHp,
    turnoIndex: 0,
    totalTurnos: cfg.turnosPorLado * 2,
    aguardandoInput: false,
    rodando: false,
    ponteiroPos: 0,
    velocidade: 0.9,
    zonaCentro: 50,
    inicioTempo: 0,
    stats: { perfeito: 0, bom: 0, falha: 0 },
    rafId: null
};


// ==========================================
// ELEMENTOS
// ==========================================

const el = {
    tituloConfronto: document.getElementById("tituloConfronto"),
    nomeJogador: document.getElementById("nomeJogador"),
    nivelJogador: document.getElementById("nivelJogador"),
    nomeInimigo: document.getElementById("nomeInimigo"),
    nivelInimigo: document.getElementById("nivelInimigo"),
    hpJogador: document.getElementById("hpJogador"),
    hpInimigo: document.getElementById("hpInimigo"),
    hpJogadorNumero: document.getElementById("hpJogadorNumero"),
    hpInimigoNumero: document.getElementById("hpInimigoNumero"),
    imagemJogador: document.getElementById("imagemJogador"),
    imagemInimigo: document.getElementById("imagemInimigo"),
    critterJogador: document.getElementById("critterJogador"),
    critterInimigo: document.getElementById("critterInimigo"),
    danoPopupJogador: document.getElementById("danoPopupJogador"),
    danoPopupInimigo: document.getElementById("danoPopupInimigo"),
    palco: document.getElementById("palco"),
    mensagemBatalha: document.getElementById("mensagemBatalha"),
    contadorJogador: document.getElementById("contadorJogador"),
    contadorInimigo: document.getElementById("contadorInimigo"),
    botaoAcao: document.getElementById("botaoAcao"),
    overlayInicio: document.getElementById("overlayInicio"),
    overlayFim: document.getElementById("overlayFim"),
    botaoIniciar: document.getElementById("botaoIniciar"),
    botaoNovaBatalha: document.getElementById("botaoNovaBatalha"),
    tituloFim: document.getElementById("tituloFim"),
    textoFim: document.getElementById("textoFim"),
    statPerfeito: document.getElementById("statPerfeito"),
    statBom: document.getElementById("statBom"),
    statFalha: document.getElementById("statFalha")
};

const canvas = document.getElementById("qteCanvas");
const ctx = canvas.getContext("2d");


// ==========================================
// CANVAS
// ==========================================

function redimensionarCanvas() {
    const razao = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * razao;
    canvas.height = rect.height * razao;
    ctx.setTransform(razao, 0, 0, razao, 0, 0);
}

window.addEventListener("resize", redimensionarCanvas);


// ==========================================
// CARREGAR MASCOTE ATUAL PARA SABER
// QUEM É O SEU POKÉMON
// ==========================================

async function carregarConfronto() {

    let nomeJogador = "Pikachu";
    let nivelJogador = 1;

    try {
        const resposta = await fetch("/api/tamagotchi");

        if (resposta.ok) {
            const mascote = await resposta.json();

            if (mascote.pokemon) {
                nomeJogador = mascote.pokemon;
            }

            nivelJogador = mascote.nivel || 1;
        }
    } catch (erro) {
        console.error("Não foi possível carregar o mascote:", erro);
    }

    state.jogadorNome = nomeJogador;
    state.jogadorNivel = nivelJogador;

    // Escolhe um inimigo aleatório, diferente do seu Pokémon
    const nomesDisponiveis = Object.keys(NUMERO_POR_NOME)
        .filter(nome => nome !== nomeJogador.toLowerCase());

    const nomeInimigo =
        nomesDisponiveis[Math.floor(Math.random() * nomesDisponiveis.length)];

    state.inimigoNome = nomeInimigo;

    // Preenche a tela
    el.nomeJogador.textContent = nomeExibicao(state.jogadorNome);
    el.nivelJogador.textContent = "Nv." + state.jogadorNivel;

    el.nomeInimigo.textContent = nomeExibicao(state.inimigoNome);
    el.nivelInimigo.textContent = "Nv." + (1 + Math.floor(Math.random() * state.jogadorNivel));

    el.imagemJogador.src = imagemPara(state.jogadorNome);
    el.imagemInimigo.src = imagemPara(state.inimigoNome);

    el.tituloConfronto.textContent =
        nomeExibicao(state.jogadorNome) + " vs " + nomeExibicao(state.inimigoNome);

    el.botaoIniciar.disabled = false;
}


// ==========================================
// HP
// ==========================================

function definirHp(lado, valor) {
    const clamped = Math.max(0, Math.min(cfg.maxHp, valor));

    if (lado === "jogador") {
        state.jogadorHp = clamped;
        el.hpJogador.style.width = clamped + "%";
        el.hpJogador.classList.toggle("baixa", clamped <= 25);
        el.hpJogadorNumero.textContent = Math.round(clamped) + "/100";
    } else {
        state.inimigoHp = clamped;
        el.hpInimigo.style.width = clamped + "%";
        el.hpInimigo.classList.toggle("baixa", clamped <= 25);
        el.hpInimigoNumero.textContent = Math.round(clamped) + "/100";
    }
}


// ==========================================
// MENSAGEM E EFEITOS
// ==========================================

function log(texto) {
    el.mensagemBatalha.textContent = texto;
}

function mostrarDano(lado, quantidade, ehBloqueio) {
    const popup = lado === "jogador" ? el.danoPopupJogador : el.danoPopupInimigo;
    popup.textContent = "-" + Math.round(quantidade);
    popup.classList.remove("show", "bloqueio");
    void popup.offsetWidth;
    if (ehBloqueio) popup.classList.add("bloqueio");
    popup.classList.add("show");

    const critter = lado === "jogador" ? el.critterJogador : el.critterInimigo;
    critter.classList.remove("atingido");
    void critter.offsetWidth;
    critter.classList.add("atingido");

    el.palco.classList.remove("tremer");
    void el.palco.offsetWidth;
    el.palco.classList.add("tremer");
}


// ==========================================
// TURNOS
// ==========================================

function tipoTurnoAtual() {
    return state.turnoIndex % 2 === 0 ? "jogador" : "inimigo";
}

function atualizarContadores() {
    let contJogador = 0, contInimigo = 0;

    for (let i = 0; i <= state.turnoIndex; i++) {
        if (i % 2 === 0) contJogador++; else contInimigo++;
    }

    el.contadorJogador.textContent =
        "Seus ataques: " + Math.min(contJogador, cfg.turnosPorLado) + "/5";

    el.contadorInimigo.textContent =
        "Ataques inimigos: " + Math.min(contInimigo, cfg.turnosPorLado) + "/5";
}

function iniciarBatalha() {
    state.jogadorHp = cfg.maxHp;
    state.inimigoHp = cfg.maxHp;
    state.turnoIndex = 0;
    state.stats = { perfeito: 0, bom: 0, falha: 0 };

    definirHp("jogador", cfg.maxHp);
    definirHp("inimigo", cfg.maxHp);

    el.overlayInicio.classList.remove("mostrar");
    el.overlayFim.classList.remove("mostrar");

    redimensionarCanvas();
    iniciarTurno();
}

function iniciarTurno() {
    if (
        state.jogadorHp <= 0 ||
        state.inimigoHp <= 0 ||
        state.turnoIndex >= state.totalTurnos
    ) {
        return finalizarBatalha();
    }

    atualizarContadores();

    const tipo = tipoTurnoAtual();
    state.velocidade = 0.85 + state.turnoIndex * 0.045;
    state.zonaCentro = 22 + Math.random() * 56;
    state.aguardandoInput = true;
    state.inicioTempo = performance.now();

    el.critterJogador.classList.remove("atacando");
    el.critterInimigo.classList.remove("atacando");

    if (tipo === "jogador") {
        log("Seu turno! Acerte a zona para atacar.");
        el.botaoAcao.textContent = "Atacar";
        el.botaoAcao.classList.remove("defender");
    } else {
        log("O inimigo vai atacar! Acerte a zona para se defender.");
        el.botaoAcao.textContent = "Defender";
        el.botaoAcao.classList.add("defender");
    }

    el.botaoAcao.disabled = false;

    state.rodando = true;
    if (state.rafId) cancelAnimationFrame(state.rafId);
    animarBarra();
}

function animarBarra() {
    const agora = performance.now();
    const t = (agora - state.inicioTempo) / 1000;
    const pos = 50 + 50 * Math.sin(t * state.velocidade * 3.4);
    state.ponteiroPos = Math.max(0, Math.min(100, pos));
    desenharBarra();

    if (state.rodando) {
        state.rafId = requestAnimationFrame(animarBarra);
    }
}

function desenharBarra() {
    const rect = canvas.getBoundingClientRect();
    const w = rect.width, h = rect.height;
    ctx.clearRect(0, 0, w, h);

    const trilhaY = h / 2;

    ctx.strokeStyle = "rgba(0,0,0,0.12)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(8, trilhaY);
    ctx.lineTo(w - 8, trilhaY);
    ctx.stroke();

    const tipo = tipoTurnoAtual();
    const corBoa = tipo === "jogador" ? "rgba(255,203,5,0.35)" : "rgba(108,196,255,0.35)";
    const corPerfeita = tipo === "jogador" ? "#ffcb05" : "#3d86c4";

    const zonaX = (state.zonaCentro / 100) * (w - 16) + 8;
    const metadeBoa = (cfg.larguraBom / 100) * (w - 16) / 2;
    const metadePerfeita = (cfg.larguraPerfeito / 100) * (w - 16) / 2;

    ctx.fillStyle = corBoa;
    ctx.fillRect(zonaX - metadeBoa, trilhaY - 9, metadeBoa * 2, 18);

    ctx.fillStyle = corPerfeita;
    ctx.fillRect(zonaX - metadePerfeita, trilhaY - 9, metadePerfeita * 2, 18);

    const px = (state.ponteiroPos / 100) * (w - 16) + 8;
    ctx.fillStyle = "#333";
    ctx.beginPath();
    ctx.moveTo(px, trilhaY - 16);
    ctx.lineTo(px - 6, trilhaY - 24);
    ctx.lineTo(px + 6, trilhaY - 24);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(px - 1.5, trilhaY - 16, 3, 32);
}

function avaliarAcerto() {
    const distancia = Math.abs(state.ponteiroPos - state.zonaCentro);
    if (distancia <= cfg.larguraPerfeito / 2) return "perfeito";
    if (distancia <= cfg.larguraBom / 2) return "bom";
    return "falha";
}

function resolverTurno(qualidade) {
    state.aguardandoInput = false;
    state.rodando = false;
    if (state.rafId) cancelAnimationFrame(state.rafId);
    el.botaoAcao.disabled = true;
    state.stats[qualidade]++;

    const tipo = tipoTurnoAtual();

    if (tipo === "jogador") {
        el.critterJogador.classList.add("atacando");
        const dano = cfg.danoAtaque[qualidade];

        setTimeout(() => {
            definirHp("inimigo", state.inimigoHp - dano);
            mostrarDano("inimigo", dano, false);

            const msg = qualidade === "perfeito" ? "Ataque perfeito! Dano crítico!" :
                        qualidade === "bom" ? "Bom golpe!" :
                        "Você quase errou o momento...";
            log(msg);
        }, 220);

    } else {
        const entrando = cfg.defesa.base + state.turnoIndex * 0.6;
        const dano = qualidade === "perfeito" ? cfg.defesa.perfeito :
                     qualidade === "bom" ? cfg.defesa.bom : entrando;

        el.critterInimigo.classList.add("atacando");

        setTimeout(() => {
            definirHp("jogador", state.jogadorHp - dano);
            mostrarDano("jogador", dano, qualidade !== "falha");

            const msg = qualidade === "perfeito" ? "Defesa perfeita! Quase sem dano!" :
                        qualidade === "bom" ? "Você bloqueou parte do golpe." :
                        "Não deu tempo de reagir!";
            log(msg);
        }, 220);
    }

    setTimeout(() => {
        state.turnoIndex++;
        iniciarTurno();
    }, 1300);
}

function tentarInput() {
    if (!state.aguardandoInput) return;
    const qualidade = avaliarAcerto();
    resolverTurno(qualidade);
}


// ==========================================
// FIM DA BATALHA
// ==========================================

async function finalizarBatalha() {
    state.rodando = false;
    if (state.rafId) cancelAnimationFrame(state.rafId);
    el.botaoAcao.disabled = true;

    const venceu = state.inimigoHp <= 0 && state.jogadorHp > 0
        ? true
        : state.jogadorHp <= 0
            ? false
            : state.jogadorHp >= state.inimigoHp;

    let titulo, texto;

    if (state.jogadorHp <= 0 && state.inimigoHp <= 0) {
        titulo = "Empate!";
        texto = "Os dois pokémon caíram ao mesmo tempo.";
    } else if (state.jogadorHp <= 0) {
        titulo = "Derrota";
        texto = "Seu Pokémon não resistiu. Cuide dele e tente de novo!";
    } else if (state.inimigoHp <= 0) {
        titulo = "Vitória!";
        texto = "Seu Pokémon venceu a batalha!";
    } else if (state.jogadorHp > state.inimigoHp) {
        titulo = "Vitória!";
        texto = "O tempo acabou, mas seu Pokémon terminou em vantagem.";
    } else if (state.inimigoHp > state.jogadorHp) {
        titulo = "Derrota";
        texto = "O tempo acabou e o inimigo terminou em vantagem.";
    } else {
        titulo = "Empate!";
        texto = "As duas equipes terminaram com o mesmo HP.";
    }

    el.tituloFim.textContent = titulo;
    el.textoFim.textContent = texto;
    el.statPerfeito.textContent = state.stats.perfeito;
    el.statBom.textContent = state.stats.bom;
    el.statFalha.textContent = state.stats.falha;

    // Dano que o SEU Pokémon sofreu de verdade durante a luta
    const danoRecebido = cfg.maxHp - state.jogadorHp;

    try {
        await fetch("/api/tamagotchi/batalha", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                venceu: venceu,
                danoRecebido: danoRecebido
            })
        });
    } catch (erro) {
        console.error("Não foi possível registrar o resultado da batalha:", erro);
    }

    setTimeout(() => el.overlayFim.classList.add("mostrar"), 300);
}


// ==========================================
// EVENTOS
// ==========================================

el.botaoIniciar.addEventListener("click", iniciarBatalha);
el.botaoNovaBatalha.addEventListener("click", async () => {
    await carregarConfronto();
    iniciarBatalha();
});
el.botaoAcao.addEventListener("click", tentarInput);

window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault();
        tentarInput();
    }
});


// ==========================================
// INÍCIO
// ==========================================

el.botaoIniciar.disabled = true;
el.overlayInicio.classList.add("mostrar");
redimensionarCanvas();
carregarConfronto();
