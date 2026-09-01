// ==========================================
// TAMAGOTCHI POKÉMON
// SISTEMA DE ESCOLHA DE POKÉMON
// ==========================================

// Função auxiliar para gerar URL da PokeAPI
function getPokemonImageUrl(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

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
            imagem: getPokemonImageUrl(1)
        },

        {
            nome: "Charmander",
            numero: 4,
            imagem: getPokemonImageUrl(4)
        },

        {
            nome: "Squirtle",
            numero: 7,
            imagem: getPokemonImageUrl(7)
        },

        {
            nome: "Pikachu",
            numero: 25,
            imagem: getPokemonImageUrl(25)
        }
    ],


    // ==========================================
    // GERAÇÃO 2
    // ==========================================

    2: [
        {
            nome: "Chikorita",
            numero: 152,
            imagem: getPokemonImageUrl(152)
        },

        {
            nome: "Cyndaquil",
            numero: 155,
            imagem: getPokemonImageUrl(155)
        },

        {
            nome: "Totodile",
            numero: 158,
            imagem: getPokemonImageUrl(158)
        }
    ],


    // ==========================================
    // GERAÇÃO 3
    // ==========================================

    3: [
        {
            nome: "Treecko",
            numero: 252,
            imagem: getPokemonImageUrl(252)
        },

        {
            nome: "Torchic",
            numero: 255,
            imagem: getPokemonImageUrl(255)
        },

        {
            nome: "Mudkip",
            numero: 258,
            imagem: getPokemonImageUrl(258)
        }
    ],


    // ==========================================
    // GERAÇÃO 4
    // ==========================================

    4: [
        {
            nome: "Turtwig",
            numero: 387,
            imagem: getPokemonImageUrl(387)
        },

        {
            nome: "Chimchar",
            numero: 390,
            imagem: getPokemonImageUrl(390)
        },

        {
            nome: "Piplup",
            numero: 393,
            imagem: getPokemonImageUrl(393)
        }
    ],


    // ==========================================
    // GERAÇÃO 5
    // ==========================================

    5: [
        {
            nome: "Snivy",
            numero: 495,
            imagem: getPokemonImageUrl(495)
        },

        {
            nome: "Tepig",
            numero: 498,
            imagem: getPokemonImageUrl(498)
        },

        {
            nome: "Oshawott",
            numero: 501,
            imagem: getPokemonImageUrl(501)
        }
    ],


    // ==========================================
    // GERAÇÃO 6
    // ==========================================

    6: [
        {
            nome: "Chespin",
            numero: 650,
            imagem: getPokemonImageUrl(650)
        },

        {
            nome: "Fennekin",
            numero: 653,
            imagem: getPokemonImageUrl(653)
        },

        {
            nome: "Froakie",
            numero: 656,
            imagem: getPokemonImageUrl(656)
        }
    ],


    // ==========================================
    // GERAÇÃO 7
    // ==========================================

    7: [
        {
            nome: "Rowlet",
            numero: 722,
            imagem: getPokemonImageUrl(722)
        },

        {
            nome: "Litten",
            numero: 725,
            imagem: getPokemonImageUrl(725)
        },

        {
            nome: "Popplio",
            numero: 728,
            imagem: getPokemonImageUrl(728)
        }
    ],


    // ==========================================
    // GERAÇÃO 8
    // ==========================================

    8: [
        {
            nome: "Grookey",
            numero: 810,
            imagem: getPokemonImageUrl(810)
        },

        {
            nome: "Scorbunny",
            numero: 813,
            imagem: getPokemonImageUrl(813)
        },

        {
            nome: "Sobble",
            numero: 816,
            imagem: getPokemonImageUrl(816)
        }
    ],


    // ==========================================
    // GERAÇÃO 9
    // ==========================================

    9: [
        {
            nome: "Sprigatito",
            numero: 906,
            imagem: getPokemonImageUrl(906)
        },

        {
            nome: "Fuecoco",
            numero: 909,
            imagem: getPokemonImageUrl(909)
        },

        {
            nome: "Quaxly",
            numero: 912,
            imagem: getPokemonImageUrl(912)
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
// CONFIRMAR ESCOLHA (LOCALSTORAGE)
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


    // Avisa o servidor qual Pokémon foi escolhido
    // (sem isso, o jogo.js nunca sabia qual mascote carregar)

    try {

        await fetch(
            "/api/tamagotchi/escolher",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    pokemon: pokemonEscolhido.nome
                })
            }
        );

    } catch (erro) {

        console.error(
            "Não foi possível salvar a escolha no servidor:",
            erro
        );
    }


    // Salva os dados do Pokémon no navegador do usuário

    localStorage.setItem(
        "pokemonEscolhido",
        JSON.stringify(pokemonEscolhido)
    );


    // Redireciona para a tela do jogo

    window.location.href =
        "jogo.html";
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