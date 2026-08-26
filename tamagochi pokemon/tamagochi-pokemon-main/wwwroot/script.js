// ==========================================
// TAMAGOTCHI POKÉMON
// SISTEMA DE ESCOLHA DE POKÉMON
// ==========================================


// ==========================================
// POKÉMON DISPONÍVEIS POR GERAÇÃO
// ==========================================

const geracoes = {

    // ==========================================
    // GERAÇÃO 1
    // ==========================================

    1: [
        {
            nome: "Bulbasaur",
            numero: 1,
            imagem: "images/pokemon/gen1/Bulbasauro.png"
        },

        {
            nome: "Charmander",
            numero: 4,
            imagem: "images/pokemon/gen1/Charmander.png"
        },

        {
            nome: "Squirtle",
            numero: 7,
            imagem: "images/pokemon/gen1/Squirtle.png"
        },

        {
            nome: "Pikachu",
            numero: 25,
            imagem: "images/pokemon/gen1/Pikachu.png"
        }
    ],


    // ==========================================
    // GERAÇÃO 2
    // ==========================================

    2: [
        {
            nome: "Chikorita",
            numero: 152,
            imagem: "images/pokemon/gen2/Chicorita.png"
        },

        {
            nome: "Cyndaquil",
            numero: 155,
            imagem: "images/pokemon/gen2/Cyndaquil.png"
        },

        {
            nome: "Totodile",
            numero: 158,
            imagem: "images/pokemon/gen2/Totodile.png"
        }
    ],


    // ==========================================
    // GERAÇÃO 3
    // ==========================================

    3: [
        {
            nome: "Treecko",
            numero: 252,
            imagem: "images/pokemon/gen3/Treecko.png"
        },

        {
            nome: "Torchic",
            numero: 255,
            imagem: "images/pokemon/gen3/Torchic.png"
        },

        {
            nome: "Mudkip",
            numero: 258,
            imagem: "images/pokemon/gen3/Mudkip.png"
        }
    ],


    // ==========================================
    // GERAÇÃO 4
    // ==========================================

    4: [
        {
            nome: "Turtwig",
            numero: 387,
            imagem: "images/pokemon/gen4/Turtwig.png"
        },

        {
            nome: "Chimchar",
            numero: 390,
            imagem: "images/pokemon/gen4/Chimchar.png"
        },

        {
            nome: "Piplup",
            numero: 393,
            imagem: "images/pokemon/gen4/Piplup.png"
        }
    ],


    // ==========================================
    // GERAÇÃO 5
    // ==========================================

    5: [
        {
            nome: "Snivy",
            numero: 495,
            imagem: "images/pokemon/gen5/Snivy.png"
        },

        {
            nome: "Tepig",
            numero: 498,
            imagem: "images/pokemon/gen5/Tepig.png"
        },

        {
            nome: "Oshawott",
            numero: 501,
            imagem: "images/pokemon/gen5/Oshawott.png"
        }
    ],


    // ==========================================
    // GERAÇÃO 6
    // ==========================================

    6: [
        {
            nome: "Chespin",
            numero: 650,
            imagem: "images/pokemon/gen6/Chespin.png"
        },

        {
            nome: "Fennekin",
            numero: 653,
            imagem: "images/pokemon/gen6/Fennekin.png"
        },

        {
            nome: "Froakie",
            numero: 656,
            imagem: "images/pokemon/gen6/Froakie.png"
        }
    ],


    // ==========================================
    // GERAÇÃO 7
    // ==========================================

    7: [
        {
            nome: "Rowlet",
            numero: 722,
            imagem: "images/pokemon/gen7/Rowlet.png"
        },

        {
            nome: "Litten",
            numero: 725,
            imagem: "images/pokemon/gen7/Litten.png"
        },

        {
            nome: "Popplio",
            numero: 728,
            imagem: "images/pokemon/gen7/Popplio.png"
        }
    ],


    // ==========================================
    // GERAÇÃO 8
    // ==========================================

    8: [
        {
            nome: "Grookey",
            numero: 810,
            imagem: "images/pokemon/gen8/Grookey.png"
        },

        {
            nome: "Scorbunny",
            numero: 813,
            imagem: "images/pokemon/gen8/Scorbunny.png"
        },

        {
            nome: "Sobble",
            numero: 816,
            imagem: "images/pokemon/gen8/Sobble.png"
        }
    ],


    // ==========================================
    // GERAÇÃO 9
    // ==========================================

    9: [
        {
            nome: "Sprigatito",
            numero: 906,
            imagem: "images/pokemon/gen9/Sprigatito.png"
        },

        {
            nome: "Fuecoco",
            numero: 909,
            imagem: "images/pokemon/gen9/Fuecoco.png"
        },

        {
            nome: "Quaxly",
            numero: 912,
            imagem: "images/pokemon/gen9/Quaxly.png"
        }
    ]

};


// ==========================================
// POKÉMON ATUALMENTE SELECIONADO
// ==========================================

let pokemonEscolhido = null;


// ==========================================
// MOSTRAR UMA GERAÇÃO
// ==========================================

function mostrarGeracao(numeroGeracao) {

    const lista =
        document.getElementById("listaPokemon");

    const titulo =
        document.getElementById("tituloGeracao");


    // Limpa a lista

    lista.innerHTML = "";


    // Atualiza o título

    titulo.textContent =
        "Geração " + numeroGeracao;


    // Pega os Pokémon da geração

    const pokemonDaGeracao =
        geracoes[numeroGeracao];


    // Cria os cards

    pokemonDaGeracao.forEach(pokemon => {

        const card =
            document.createElement("div");


        card.classList.add(
            "pokemon-card"
        );


        card.innerHTML = `

            <img
                src="${pokemon.imagem}"
                alt="${pokemon.nome}"
            >

            <h3>
                ${pokemon.nome}
            </h3>

            <p>
                #${pokemon.numero}
            </p>

            <button>
                Selecionar
            </button>

        `;


        // Quando clicar no Pokémon

        card.addEventListener(
            "click",
            function () {

                selecionarPokemon(
                    pokemon
                );

            }
        );


        lista.appendChild(card);

    });


    // Atualiza a aba ativa

    atualizarAba(
        numeroGeracao
    );
}


// ==========================================
// SELECIONAR POKÉMON
// ==========================================

function selecionarPokemon(pokemon) {

    pokemonEscolhido =
        pokemon;


    // Mostra a imagem escolhida

    document.getElementById(
        "imagemSelecionado"
    ).src =
        pokemon.imagem;


    // Mostra o nome

    document.getElementById(
        "nomeSelecionado"
    ).textContent =
        pokemon.nome;


    // Ativa o botão

    document.getElementById(
        "botaoEscolher"
    ).disabled =
        false;
}


// ==========================================
// CONFIRMAR ESCOLHA
// ==========================================

async function confirmarPokemon() {

    // Verifica se escolheu Pokémon

    if (pokemonEscolhido === null) {

        alert(
            "Escolha um Pokémon primeiro!"
        );

        return;
    }


    console.log(
        "Pokémon escolhido:",
        pokemonEscolhido.nome
    );


    try {

        // Envia o Pokémon para o C#

        const resposta =
            await fetch(
                "/api/tamagotchi/escolher",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        pokemon:
                            pokemonEscolhido.nome

                    })
                }
            );


        // ==========================================
        // SUCESSO
        // ==========================================

        if (resposta.ok) {

            // Vai para o Tamagotchi

            window.location.href =
                "jogo.html";

        }


        // ==========================================
        // ERRO DO SERVIDOR
        // ==========================================

        else {

            alert(
                "Não foi possível salvar o Pokémon."
            );

        }

    }


    // ==========================================
    // ERRO DE CONEXÃO
    // ==========================================

    catch (erro) {

        console.error(
            "Erro:",
            erro
        );


        alert(
            "Não foi possível conectar ao servidor."
        );

    }
}


// ==========================================
// ATUALIZAR ABA ATIVA
// ==========================================

function atualizarAba(numeroGeracao) {

    const abas =
        document.querySelectorAll(
            ".aba"
        );


    abas.forEach(
        (aba, index) => {

            aba.classList.remove(
                "ativa"
            );


            if (
                index + 1 ===
                numeroGeracao
            ) {

                aba.classList.add(
                    "ativa"
                );

            }

        }
    );
}


// ==========================================
// INICIAR
// ==========================================

// Começa na Geração 1

mostrarGeracao(1);