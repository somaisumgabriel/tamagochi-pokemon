// ==========================================
// POKÉCARE - SISTEMA DE BATALHA QTE
// ==========================================


// ==========================================
// POKÉMON DO JOGADOR
// ==========================================

const pokemonSalvo =
    JSON.parse(localStorage.getItem("pokemonEscolhido"));


// ==========================================
// CONFIGURAÇÕES DO JOGADOR
// ==========================================

const jogador = {

    nome: pokemonSalvo ? pokemonSalvo.nome : "Pikachu",

    numero: pokemonSalvo ? pokemonSalvo.numero : 25,

    nivel: 5,

    hp: 100,

    hpMax: 100,

    ataque: 20,

    xp: 0
};


// ==========================================
// INIMIGO
// ==========================================

const inimigos = [

    {
        nome: "Rattata",
        numero: 19,
        nivel: 5,
        hp: 80,
        hpMax: 80,
        ataque: 15
    },

    {
        nome: "Pidgey",
        numero: 16,
        nivel: 5,
        hp: 80,
        hpMax: 80,
        ataque: 15
    },

    {
        nome: "Caterpie",
        numero: 10,
        nivel: 5,
        hp: 75,
        hpMax: 75,
        ataque: 14
    },

    {
        nome: "Zubat",
        numero: 41,
        nivel: 5,
        hp: 85,
        hpMax: 85,
        ataque: 16
    }

];


// Escolhe um inimigo aleatório

const inimigoBase =
    inimigos[
        Math.floor(Math.random() * inimigos.length)
    ];


// Cria uma cópia do inimigo

const inimigo = {

    ...inimigoBase

};


// ==========================================
// IMAGENS
// ==========================================

function getPokemonImageUrl(numero) {

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numero}.png`;

}


// ==========================================
// ELEMENTOS DA TELA
// ==========================================

const playerName =
    document.getElementById("playerName");

const playerLevel =
    document.getElementById("playerLevel");

const playerHp =
    document.getElementById("playerHp");

const playerHpText =
    document.getElementById("playerHpText");

const playerImage =
    document.getElementById("playerImage");


const enemyName =
    document.getElementById("enemyName");

const enemyLevel =
    document.getElementById("enemyLevel");

const enemyHp =
    document.getElementById("enemyHp");

const enemyHpText =
    document.getElementById("enemyHpText");

const enemyImage =
    document.getElementById("enemyImage");


const battleMessage =
    document.getElementById("battleMessage");


const qteArea =
    document.getElementById("qteArea");

const qteMarker =
    document.getElementById("qteMarker");

const qteButton =
    document.getElementById("qteButton");


const attackBtn =
    document.getElementById("attackBtn");

const defendBtn =
    document.getElementById("defendBtn");

const runBtn =
    document.getElementById("runBtn");


const battleResult =
    document.getElementById("battleResult");

const resultTitle =
    document.getElementById("resultTitle");

const resultMessage =
    document.getElementById("resultMessage");

const xpReward =
    document.getElementById("xpReward");

const continueBtn =
    document.getElementById("continueBtn");


const voltarBtn =
    document.getElementById("voltarBtn");


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

    // Jogador

    playerName.textContent =
        jogador.nome;

    playerLevel.textContent =
        `Lv. ${jogador.nivel}`;

    playerImage.src =
        getPokemonImageUrl(jogador.numero);


    // Inimigo

    enemyName.textContent =
        inimigo.nome;

    enemyLevel.textContent =
        `Lv. ${inimigo.nivel}`;

    enemyImage.src =
        getPokemonImageUrl(inimigo.numero);


    // Atualiza HP

    atualizarHP();


    battleMessage.textContent =
        `Um ${inimigo.nome} selvagem apareceu!`;


    qteArea.style.display =
        "none";

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
// ATACAR
// ==========================================

attackBtn.addEventListener(
    "click",
    () => {

        if (
            !batalhaAtiva ||
            !turnoJogador
        ) {
            return;
        }


        iniciarQTE();

    }
);


// ==========================================
// INICIAR QTE
// ==========================================

function iniciarQTE() {

    qteAtivo = true;

    qteArea.style.display =
        "block";


    battleMessage.textContent =
        "⚡ Acerte o momento certo!";


    qtePosicao = 0;

    qteDirecao = 1;


    qteMarker.style.left =
        "0%";


    clearInterval(qteInterval);


    qteInterval =
        setInterval(() => {

            if (!qteAtivo) {
                return;
            }


            qtePosicao +=
                qteDirecao * 2;


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
// BOTÃO QTE
// ==========================================

qteButton.addEventListener(
    "click",
    acertarQTE
);


// ==========================================
// ESPAÇO PARA QTE
// ==========================================

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.code === "Space" &&
            qteAtivo
        ) {

            event.preventDefault();

            acertarQTE();

        }

    }
);


// ==========================================
// CALCULAR QTE
// ==========================================

function acertarQTE() {

    if (!qteAtivo) {
        return;
    }


    qteAtivo = false;

    clearInterval(qteInterval);


    let dano =
        jogador.ataque;

    let mensagem = "";

    let critico = false;


    // ATAQUE PERFEITO

    if (
        qtePosicao >= 47 &&
        qtePosicao <= 53
    ) {

        dano =
            Math.floor(
                jogador.ataque * 2
            );

        critico = true;

        mensagem =
            "💥 PERFEITO! ACERTO CRÍTICO!";

    }


    // ATAQUE NORMAL

    else if (
        qtePosicao >= 40 &&
        qtePosicao <= 60
    ) {

        dano =
            Math.floor(
                jogador.ataque * 1.3
            );

        mensagem =
            "⚡ ÓTIMO! Você acertou!";

    }


    // ERRO

    else {

        dano = 0;

        mensagem =
            "❌ Você errou o ataque!";

    }


    inimigo.hp -= dano;


    if (inimigo.hp < 0) {

        inimigo.hp = 0;

    }


    atualizarHP();


    if (dano > 0) {

        battleMessage.textContent =
            `${mensagem} ${dano} de dano!`;

    }

    else {

        battleMessage.textContent =
            mensagem;

    }


    qteArea.style.display =
        "none";


    // INIMIGO DERROTADO

    if (inimigo.hp <= 0) {

        setTimeout(
            vitoria,
            900
        );

        return;

    }


    // TURNO DO INIMIGO

    turnoJogador = false;


    setTimeout(
        turnoInimigo,
        1200
    );

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


    setTimeout(
        () => {

            let dano =
                inimigo.ataque;


            // DEFESA

            if (defendendo) {

                dano =
                    Math.floor(
                        dano / 2
                    );


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


            // DERROTA

            if (jogador.hp <= 0) {

                setTimeout(
                    derrota,
                    800
                );

                return;

            }


            // VOLTA PARA O JOGADOR

            setTimeout(
                () => {

                    turnoJogador = true;

                    battleMessage.textContent =
                        "É sua vez! Escolha uma ação.";

                },
                800
            );


        },
        800
    );

}


// ==========================================
// DEFENDER
// ==========================================

defendBtn.addEventListener(
    "click",
    () => {

        if (
            !batalhaAtiva ||
            !turnoJogador
        ) {
            return;
        }


        defendendo = true;

        turnoJogador = false;


        battleMessage.textContent =
            "🛡️ Você está se defendendo!";


        setTimeout(
            turnoInimigo,
            700
        );

    }
);


// ==========================================
// FUGIR
// ==========================================

runBtn.addEventListener(
    "click",
    () => {

        if (
            !batalhaAtiva ||
            !turnoJogador
        ) {
            return;
        }


        const conseguiuFugir =
            Math.random() < 0.7;


        if (conseguiuFugir) {

            batalhaAtiva = false;


            battleMessage.textContent =
                "🏃 Você conseguiu fugir!";


            setTimeout(
                () => {

                    window.location.href =
                        "jogo.html";

                },
                1000
            );

        }

        else {

            battleMessage.textContent =
                "❌ Você não conseguiu fugir!";


            turnoJogador = false;


            setTimeout(
                turnoInimigo,
                900
            );

        }

    }
);


// ==========================================
// VITÓRIA
// ==========================================

function vitoria() {

    batalhaAtiva = false;


    clearInterval(
        qteInterval
    );


    const xpGanho = 50;


    jogador.xp +=
        xpGanho;


    resultTitle.textContent =
        "🏆 VITÓRIA!";


    resultMessage.textContent =
        `Você derrotou ${inimigo.nome}!`;


    xpReward.textContent =
        `⭐ +${xpGanho} XP`;


    battleResult.classList.remove(
        "hidden"
    );


    battleMessage.textContent =
        `${inimigo.nome} foi derrotado!`;

}


// ==========================================
// DERROTA
// ==========================================

function derrota() {

    batalhaAtiva = false;


    clearInterval(
        qteInterval
    );


    resultTitle.textContent =
        "💀 DERROTA";


    resultMessage.textContent =
        `${jogador.nome} foi derrotado...`;


    xpReward.textContent =
        "⭐ +0 XP";


    battleResult.classList.remove(
        "hidden"
    );


    battleMessage.textContent =
        "Você perdeu a batalha...";

}


// ==========================================
// CONTINUAR
// ==========================================

continueBtn.addEventListener(
    "click",
    () => {

        window.location.href =
            "jogo.html";

    }
);


// ==========================================
// VOLTAR
// ==========================================

voltarBtn.addEventListener(
    "click",
    () => {

        window.location.href =
            "jogo.html";

    }
);


// ==========================================
// INICIAR
// ==========================================

iniciarBatalha();
