
/* ==========================================
   POKÉCARE - SISTEMA DE BATALHA QTE
   ========================================== */

// ==========================================
// CONFIGURAÇÕES
// ==========================================

const jogador = {
    nome: "Pikachu",
    nivel: 5,
    hp: 100,
    hpMax: 100,
    ataque: 20,
    xp: 0
};

const inimigo = {
    nome: "Rattata",
    nivel: 5,
    hp: 80,
    hpMax: 80,
    ataque: 15
};


// ==========================================
// ELEMENTOS DA TELA
// ==========================================

const playerName = document.getElementById("playerName");
const playerLevel = document.getElementById("playerLevel");
const playerHp = document.getElementById("playerHp");
const playerHpText = document.getElementById("playerHpText");
const playerImage = document.getElementById("playerImage");

const enemyName = document.getElementById("enemyName");
const enemyLevel = document.getElementById("enemyLevel");
const enemyHp = document.getElementById("enemyHp");
const enemyHpText = document.getElementById("enemyHpText");
const enemyImage = document.getElementById("enemyImage");

const battleMessage = document.getElementById("battleMessage");

const qteArea = document.getElementById("qteArea");
const qteMarker = document.getElementById("qteMarker");
const qteButton = document.getElementById("qteButton");

const attackBtn = document.getElementById("attackBtn");
const defendBtn = document.getElementById("defendBtn");
const runBtn = document.getElementById("runBtn");

const battleResult = document.getElementById("battleResult");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");
const xpReward = document.getElementById("xpReward");
const continueBtn = document.getElementById("continueBtn");

const voltarBtn = document.getElementById("voltarBtn");


// ==========================================
// ESTADO DA BATALHA
// ==========================================

let batalhaAtiva = true;
let turnoJogador = true;

let qteAtivo = false;
let qtePosicao = 0;
let qteDirecao = 1;

let qteInterval = null;

let defendendo = false;


// ==========================================
// INICIALIZAÇÃO
// ==========================================

function iniciarBatalha() {

    playerName.textContent = jogador.nome;
    playerLevel.textContent = `Lv. ${jogador.nivel}`;

    enemyName.textContent = inimigo.nome;
    enemyLevel.textContent = `Lv. ${inimigo.nivel}`;

    atualizarHP();

    battleMessage.textContent =
        `Um ${inimigo.nome} selvagem apareceu!`;

    qteArea.style.display = "none";

    console.log("Batalha iniciada!");
}


// ==========================================
// ATUALIZAR HP
// ==========================================

function atualizarHP() {

    const porcentagemJogador =
        (jogador.hp / jogador.hpMax) * 100;

    const porcentagemInimigo =
        (inimigo.hp / inimigo.hpMax) * 100;


    playerHp.style.width =
        `${Math.max(0, porcentagemJogador)}%`;

    enemyHp.style.width =
        `${Math.max(0, porcentagemInimigo)}%`;


    playerHpText.textContent =
        `${Math.max(0, jogador.hp)} / ${jogador.hpMax}`;

    enemyHpText.textContent =
        `${Math.max(0, inimigo.hp)} / ${inimigo.hpMax}`;
}


// ==========================================
// BOTÃO ATACAR
// ==========================================

attackBtn.addEventListener("click", () => {

    if (!batalhaAtiva || !turnoJogador) {
        return;
    }

    iniciarQTE();
});


// ==========================================
// INICIAR QTE
// ==========================================

function iniciarQTE() {

    qteAtivo = true;

    qteArea.style.display = "block";

    battleMessage.textContent =
        "Acerte o momento certo para atacar!";

    qteMarker.style.left = "0%";

    qtePosicao = 0;
    qteDirecao = 1;


    clearInterval(qteInterval);

    qteInterval = setInterval(() => {

        if (!qteAtivo) {
            return;
        }

        qtePosicao += qteDirecao * 2;

        if (qtePosicao >= 96) {

            qtePosicao = 96;
            qteDirecao = -1;
        }

        if (qtePosicao <= 0) {

            qtePosicao = 0;
            qteDirecao = 1;
        }

        qteMarker.style.left =
            `${qtePosicao}%`;

    }, 20);
}


// ==========================================
// APERTAR QTE
// ==========================================

qteButton.addEventListener("click", acertarQTE);


document.addEventListener("keydown", (event) => {

    if (event.code === "Space") {

        event.preventDefault();

        if (qteAtivo) {
            acertarQTE();
        }
    }

});


// ==========================================
// CALCULAR QTE
// ==========================================

function acertarQTE() {

    if (!qteAtivo) {
        return;
    }

    qteAtivo = false;

    clearInterval(qteInterval);


    /*
       A área verde está entre 40% e 60%.
       Quanto mais perto do centro,
       maior o dano.
    */

    let dano = jogador.ataque;

    let mensagem = "";
    let critico = false;


    if (qtePosicao >= 47 && qtePosicao <= 53) {

        // ATAQUE PERFEITO

        dano = Math.floor(jogador.ataque * 2);

        critico = true;

        mensagem =
            "💥 PERFEITO! ACERTO CRÍTICO!";

    }

    else if (qtePosicao >= 40 && qtePosicao <= 60) {

        // ACERTO NORMAL

        dano =
            Math.floor(jogador.ataque * 1.3);

        mensagem =
            "⚡ ÓTIMO! Você acertou!";

    }

    else {

        // ERROU

        dano = 0;

        mensagem =
            "❌ Você errou o ataque!";
    }


    inimigo.hp -= dano;

    if (inimigo.hp < 0) {
        inimigo.hp = 0;
    }


    atualizarHP();


    if (critico) {

        battleMessage.textContent =
            `${mensagem} ${dano} de dano!`;
    }

    else if (dano > 0) {

        battleMessage.textContent =
            `${mensagem} ${dano} de dano!`;
    }

    else {

        battleMessage.textContent =
            mensagem;
    }


    qteArea.style.display = "none";


    // Verifica se o inimigo morreu

    if (inimigo.hp <= 0) {

        setTimeout(vitoria, 900);

        return;
    }


    // Passa o turno para o inimigo

    turnoJogador = false;

    setTimeout(turnoInimigo, 1200);
}


// ==========================================
// TURNO DO INIMIGO
// ==========================================

function turnoInimigo() {

    if (!batalhaAtiva) {
        return;
    }


    battleMessage.textContent =
        `${inimigo.nome} está atacando!`;


    setTimeout(() => {

        let dano = inimigo.ataque;


        // Defesa reduz o dano

        if (defendendo) {

            dano =
                Math.floor(dano / 2);

            battleMessage.textContent =
                `${inimigo.nome} atacou, mas sua defesa reduziu o dano!`;

            defendendo = false;

        }

        else {

            battleMessage.textContent =
                `${inimigo.nome} causou ${dano} de dano!`;
        }


        jogador.hp -= dano;


        if (jogador.hp < 0) {
            jogador.hp = 0;
        }


        atualizarHP();


        // Verifica derrota

        if (jogador.hp <= 0) {

            setTimeout(derrota, 800);

            return;
        }


        // Volta para o jogador

        setTimeout(() => {

            turnoJogador = true;

            battleMessage.textContent =
                "É sua vez! Escolha uma ação.";

        }, 800);


    }, 800);
}


// ==========================================
// DEFENDER
// ==========================================

defendBtn.addEventListener("click", () => {

    if (!batalhaAtiva || !turnoJogador) {
        return;
    }


    defendendo = true;

    turnoJogador = false;


    battleMessage.textContent =
        "🛡️ Você está se defendendo!";


    setTimeout(turnoInimigo, 700);
});


// ==========================================
// FUGIR
// ==========================================

runBtn.addEventListener("click", () => {

    if (!batalhaAtiva || !turnoJogador) {
        return;
    }


    const conseguiuFugir =
        Math.random() < 0.7;


    if (conseguiuFugir) {

        batalhaAtiva = false;

        battleMessage.textContent =
            "🏃 Você conseguiu fugir!";


        setTimeout(() => {

            window.location.href =
                "jogo.html";

        }, 1000);

    }

    else {

        battleMessage.textContent =
            "❌ Você não conseguiu fugir!";


        turnoJogador = false;

        setTimeout(turnoInimigo, 900);
    }
});


// ==========================================
// VITÓRIA
// ==========================================

function vitoria() {

    batalhaAtiva = false;

    clearInterval(qteInterval);


    const xpGanho = 50;

    jogador.xp += xpGanho;


    resultTitle.textContent =
        "🏆 VITÓRIA!";


    resultMessage.textContent =
        `Você derrotou ${inimigo.nome}!`;


    xpReward.textContent =
        `⭐ +${xpGanho} XP`;


    battleResult.classList.remove("hidden");


    battleMessage.textContent =
        `${inimigo.nome} foi derrotado!`;
}


// ==========================================
// DERROTA
// ==========================================

function derrota() {

    batalhaAtiva = false;

    clearInterval(qteInterval);


    resultTitle.textContent =
        "💀 DERROTA";


    resultMessage.textContent =
        `${jogador.nome} foi derrotado...`;


    xpReward.textContent =
        "⭐ +0 XP";


    battleResult.classList.remove("hidden");


    battleMessage.textContent =
        "Você perdeu a batalha...";
}


// ==========================================
// CONTINUAR
// ==========================================

continueBtn.addEventListener("click", () => {

    window.location.href =
        "jogo.html";
});


// ==========================================
// VOLTAR
// ==========================================

voltarBtn.addEventListener("click", () => {

    window.location.href =
        "jogo.html";
});


// ==========================================
// INICIAR
// ==========================================

iniciarBatalha();

