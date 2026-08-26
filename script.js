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

    const lista = document.getElementById("listaPokemon");
    const titulo = document.getElementById("tituloGeracao");

    // Segurança caso esteja no jogo.html
    if (!lista || !titulo) {
        return;
    }

    // Limpa a lista
    lista.innerHTML = "";

    // Atualiza o título
    titulo.textContent = "Geração " + numeroGeracao;

    // Pega os Pokémon da geração
    const pokemonDaGeracao = geracoes[numeroGeracao];

    // Cria os cards
    pokemonDaGeracao.forEach(pokemon => {

        const card = document.createElement("div");

        card.classList.add("pokemon-card");

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
        card.addEventListener("click", function () {
            selecionarPokemon(pokemon);
        });

        lista.appendChild(card);
    });

    // Atualiza a aba ativa
    atualizarAba(numeroGeracao);
}


// ==========================================
// SELECIONAR POKÉMON
// ==========================================

function selecionarPokemon(pokemon) {

    pokemonEscolhido = pokemon;

    const imagem = document.getElementById("imagemSelecionado");
    const nome = document.getElementById("nomeSelecionado");
    const botao = document.getElementById("botaoEscolher");

    // Mostra a imagem escolhida
    if (imagem) {
        imagem.src = pokemon.imagem;
    }

    // Mostra o nome
    if (nome) {
        nome.textContent = pokemon.nome;
    }

    // Ativa o botão
    if (botao) {
        botao.disabled = false;
    }
}


// ==========================================
// CONFIRMAR ESCOLHA
// ==========================================

function confirmarPokemon() {

    // Verifica se escolheu Pokémon
    if (pokemonEscolhido === null) {

        alert("Escolha um Pokémon primeiro!");

        return;
    }

    console.log(
        "Pokémon escolhido:",
        pokemonEscolhido.nome
    );

    // Salva os dados
    localStorage.setItem(
        "pokemonEscolhido",
        JSON.stringify(pokemonEscolhido)
    );

    // Redireciona para o jogo
    window.location.href = "jogo.html";
}


// ==========================================
// ATUALIZAR ABA ATIVA
// ==========================================

function atualizarAba(numeroGeracao) {

    const abas = document.querySelectorAll(".aba");

    abas.forEach((aba, index) => {

        aba.classList.remove("ativa");

        if (index + 1 === numeroGeracao) {
            aba.classList.add("ativa");
        }
    });
}


// ==========================================
// INICIAR SELEÇÃO DE POKÉMON
// ==========================================

// Só executa na página de seleção
if (document.getElementById("listaPokemon")) {
    mostrarGeracao(1);
}


// ==========================================
// TAMAGOTCHI - TELA DO JOGO
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


// ==========================================
// ELEMENTO DE MENSAGEM
// ==========================================

const msgEl = document.getElementById("mensagem");


// ==========================================
// CARREGAR POKÉMON SALVO
// ==========================================

const pokemonSalvo = JSON.parse(
    localStorage.getItem("pokemonEscolhido")
);

if (pokemonSalvo) {

    const elNome = document.getElementById("nomePokemon");
    const elImg = document.getElementById("imagemPokemon");

    if (elNome) {
        elNome.textContent = pokemonSalvo.nome;
    }

    if (elImg) {
        elImg.src = pokemonSalvo.imagem;
    }
}


// ==========================================
// ATUALIZAR TELA
// ==========================================

function atualizarTela() {

    // Textos
    setTex("valorVida", status.vida);
    setTex("valorFome", status.fome);
    setTex("valorHumor", status.humor);
    setTex("valorEnergia", status.energia);
    setTex("valorSono", status.sono);
    setTex("nivel", status.nivel);
    setTex("experiencia", status.xp);

    // Barras
    setBarra("barraVida", status.vida);
    setBarra("barraFome", status.fome);
    setBarra("barraHumor", status.humor);
    setBarra("barraEnergia", status.energia);
    setBarra("barraSono", status.sono);
    setBarra("barraXP", status.xp);
}


// ==========================================
// ATUALIZAR TEXTO
// ==========================================

function setTex(id, valor) {

    const el = document.getElementById(id);

    if (el) {
        el.textContent = valor;
    }
}


// ==========================================
// ATUALIZAR BARRA
// ==========================================

function setBarra(id, valor) {

    const el = document.getElementById(id);

    if (el) {

        el.style.width =
            Math.min(100, Math.max(0, valor)) + "%";
    }
}


// ==========================================
// MOSTRAR MENSAGEM
// ==========================================

function exibirMensagem(texto) {

    if (msgEl) {
        msgEl.textContent = texto;
    }
}


// ==========================================
// ALIMENTAR
// ==========================================

function alimentar() {

    status.fome =
        Math.max(0, status.fome - 20);

    status.energia =
        Math.min(100, status.energia + 5);

    exibirMensagem(
        "Nham! Seu Pokémon se alimentou. 🍖"
    );

    ganharXP(10);

    atualizarTela();
}


// ==========================================
// BRINCAR
// ==========================================

function brincar() {

    if (status.energia < 15) {

        exibirMensagem(
            "Seu Pokémon está cansado demais para brincar!"
        );

        return;
    }

    status.humor =
        Math.min(100, status.humor + 20);

    status.energia =
        Math.max(0, status.energia - 15);

    status.fome =
        Math.min(100, status.fome + 10);

    exibirMensagem(
        "Que divertido! Vocês brincaram bastante. 🎾"
    );

    ganharXP(15);

    atualizarTela();
}


// ==========================================
// DORMIR
// ==========================================

function dormir() {

    status.energia = 100;

    status.sono = 0;

    status.fome =
        Math.min(100, status.fome + 15);

    exibirMensagem(
        "Zzz... Seu Pokémon recuperou as energias! 💤"
    );

    atualizarTela();
}


// ==========================================
// CARINHO
// ==========================================

function carinho() {

    status.humor =
        Math.min(100, status.humor + 10);

    exibirMensagem(
        "Seu Pokémon adorou o carinho! ❤️"
    );

    ganharXP(5);

    atualizarTela();
}


// ==========================================
// BANHO
// ==========================================

function banho() {

    status.humor =
        Math.min(100, status.humor + 5);

    exibirMensagem(
        "Seu Pokémon está limpinho e cheiroso! 🚿"
    );

    ganharXP(5);

    atualizarTela();
}


// ==========================================
// GANHAR XP
// ==========================================

function ganharXP(qtd) {

    status.xp += qtd;

    if (status.xp >= 100) {

        status.nivel += 1;

        status.xp -= 100;

        exibirMensagem(
            `Parabéns! Seu Pokémon subiu para o Nível ${status.nivel}! 🎉`
        );
    }
}


// ==========================================
// VOLTAR PARA ESCOLHA
// ==========================================

function voltarEscolha() {

    window.location.href = "index.html";
}


// ==========================================
// INICIAR TELA DO JOGO
// ==========================================

// Só executa no jogo.html
if (document.getElementById("imagemPokemon")) {
    atualizarTela();
}
