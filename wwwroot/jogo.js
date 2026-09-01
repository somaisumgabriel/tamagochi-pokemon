// ==========================================
// TAMAGOTCHI POKÉMON
// SISTEMA PRINCIPAL DO JOGO
// ==========================================


// ==========================================
// CARREGAR MASCOTE
// ==========================================

async function carregarMascote() {

    try {

        const resposta =
            await fetch("/api/tamagotchi");

        if (!resposta.ok) {
            throw new Error(
                "Não foi possível carregar o mascote."
            );
        }

        const mascote =
            await resposta.json();

        atualizarTela(mascote);

    } catch (erro) {

        console.error(
            "Erro ao carregar mascote:",
            erro
        );

        mostrarMensagem(
            "❌ Não foi possível carregar seu Pokémon."
        );
    }
}


// ==========================================
// ATUALIZAR A TELA
// ==========================================

function atualizarTela(mascote) {

    // Nome

    document.getElementById(
        "nomePokemon"
    ).textContent =
        mascote.pokemon;


    // Imagem

    atualizarImagem(
        mascote.pokemon
    );


    // Vida

    atualizarStatus(
        "barraVida",
        "valorVida",
        mascote.vida
    );


    // Fome
    // No sistema:
    // 0 = sem fome
    // 100 = muita fome
    //
    // Por isso invertemos para a barra.

    const fomeVisual =
        100 - mascote.fome;

    atualizarStatus(
        "barraFome",
        "valorFome",
        fomeVisual
    );


    // Humor

    atualizarStatus(
        "barraHumor",
        "valorHumor",
        mascote.humor
    );


    // Energia

    atualizarStatus(
        "barraEnergia",
        "valorEnergia",
        mascote.energia
    );


    // Sono
    //
    // 0 = descansado
    // 100 = cansado
    //
    // Invertemos para mostrar
    // "energia de descanso".

    const sonoVisual =
        100 - mascote.sono;

    atualizarStatus(
        "barraSono",
        "valorSono",
        sonoVisual
    );


    // Nível

    document.getElementById(
        "nivel"
    ).textContent =
        mascote.nivel;


    // XP

    document.getElementById(
        "experiencia"
    ).textContent =
        mascote.experiencia;


    // Barra XP

    document.getElementById(
        "barraXP"
    ).style.width =
        mascote.experiencia + "%";
}


// ==========================================
// ATUALIZAR STATUS
// ==========================================

function atualizarStatus(
    barraId,
    valorId,
    valor
) {

    valor =
        Math.max(
            0,
            Math.min(
                100,
                valor
            )
        );


    document.getElementById(
        barraId
    ).style.width =
        valor + "%";


    document.getElementById(
        valorId
    ).textContent =
        valor;
}


// ==========================================
// IMAGENS DOS POKÉMON
// ==========================================

function atualizarImagem(pokemon) {

    const imagem =
        document.getElementById(
            "imagemPokemon"
        );


    const nome =
        pokemon.toLowerCase();


    const imagens = {

        // Geração 1

        "bulbasaur":
            "images/pokemon/gen1/bulbasaur.png",

        "charmander":
            "images/pokemon/gen1/charmander.png",

        "squirtle":
            "images/pokemon/gen1/squirtle.png",

        "pikachu":
            "images/pokemon/gen1/pikachu.png",


        // Geração 2

        "chikorita":
            "images/pokemon/gen2/chikorita.png",

        "cyndaquil":
            "images/pokemon/gen2/cyndaquil.png",

        "totodile":
            "images/pokemon/gen2/totodile.png",


        // Geração 3

        "treecko":
            "images/pokemon/gen3/treecko.png",

        "torchic":
            "images/pokemon/gen3/torchic.png",

        "mudkip":
            "images/pokemon/gen3/mudkip.png",


        // Geração 4

        "turtwig":
            "images/pokemon/gen4/turtwig.png",

        "chimchar":
            "images/pokemon/gen4/chimchar.png",

        "piplup":
            "images/pokemon/gen4/piplup.png",


        // Geração 5

        "snivy":
            "images/pokemon/gen5/snivy.png",

        "tepig":
            "images/pokemon/gen5/tepig.png",

        "oshawott":
            "images/pokemon/gen5/oshawott.png",


        // Geração 6

        "chespin":
            "images/pokemon/gen6/chespin.png",

        "fennekin":
            "images/pokemon/gen6/fennekin.png",

        "froakie":
            "images/pokemon/gen6/froakie.png",


        // Geração 7

        "rowlet":
            "images/pokemon/gen7/rowlet.png",

        "litten":
            "images/pokemon/gen7/litten.png",

        "popplio":
            "images/pokemon/gen7/popplio.png",


        // Geração 8

        "grookey":
            "images/pokemon/gen8/grookey.png",

        "scorbunny":
            "images/pokemon/gen8/scorbunny.png",

        "sobble":
            "images/pokemon/gen8/sobble.png",


        // Geração 9

        "sprigatito":
            "images/pokemon/gen9/sprigatito.png",

        "fuecoco":
            "images/pokemon/gen9/fuecoco.png",

        "quaxly":
            "images/pokemon/gen9/quaxly.png"
    };


    if (imagens[nome]) {

        imagem.src =
            imagens[nome];

        imagem.alt =
            pokemon;

    } else {

        console.warn(
            "Imagem não encontrada:",
            pokemon
        );

    }
}


// ==========================================
// EXECUTAR AÇÃO
// ==========================================

async function executarAcao(
    acao,
    mensagem
) {

    try {

        const resposta =
            await fetch(
                "/api/tamagotchi/" + acao,
                {
                    method: "POST"
                }
            );


        if (!resposta.ok) {

            throw new Error(
                "Erro ao executar ação."
            );

        }


        const mascote =
            await resposta.json();


        atualizarTela(
            mascote
        );


        mostrarMensagem(
            mensagem
        );


    } catch (erro) {

        console.error(
            "Erro:",
            erro
        );


        mostrarMensagem(
            "❌ Não foi possível executar essa ação."
        );
    }
}


// ==========================================
// ALIMENTAR
// ==========================================

function alimentar() {

    executarAcao(
        "alimentar",
        "🍖 Seu Pokémon comeu e está satisfeito!"
    );
}


// ==========================================
// BRINCAR
// ==========================================

function brincar() {

    executarAcao(
        "brincar",
        "🎾 Vocês brincaram juntos!"
    );
}


// ==========================================
// DORMIR
// ==========================================

function dormir() {

    executarAcao(
        "dormir",
        "💤 Seu Pokémon descansou!"
    );
}


// ==========================================
// CARINHO
// ==========================================

function carinho() {

    executarAcao(
        "carinho",
        "❤️ Seu Pokémon adorou o carinho!"
    );
}


// ==========================================
// BANHO
// ==========================================

function banho() {

    executarAcao(
        "banho",
        "🚿 Seu Pokémon tomou banho!"
    );
}


// ==========================================
// MOSTRAR MENSAGEM
// ==========================================

function mostrarMensagem(
    mensagem
) {

    const elemento =
        document.getElementById(
            "mensagem"
        );


    elemento.textContent =
        mensagem;
}


// ==========================================
// VOLTAR PARA ESCOLHA
// ==========================================

function voltarEscolha() {

    window.location.href =
        "index.html";
}


// ==========================================
// PASSAGEM AUTOMÁTICA DE TEMPO
// ==========================================

// A cada 30 segundos,
// o Pokémon perde um pouco de
// energia e fica mais faminto.

setInterval(
    async function () {

        try {

            const resposta =
                await fetch(
                    "/api/tamagotchi/tempo",
                    {
                        method: "POST"
                    }
                );


            if (resposta.ok) {

                const mascote =
                    await resposta.json();

                atualizarTela(
                    mascote
                );
            }

        } catch (erro) {

            console.error(
                "Erro na passagem de tempo:",
                erro
            );

        }

    },
    30000
);


// ==========================================
// INICIAR JOGO
// ==========================================

carregarMascote();