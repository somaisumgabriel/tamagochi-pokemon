using Microsoft.AspNetCore.Mvc;
using TamagotchiPokemon.Models;

namespace TamagotchiPokemon.Controllers
{
    [ApiController]
    [Route("api/tamagotchi")]
    public class TamagotchiController : ControllerBase
    {
        // ==========================================
        // MASCOTE ATUAL DO JOGADOR
        // ==========================================

        private static Mascote _mascote = new Mascote();


        // ==========================================
        // PEGAR INFORMAÇÕES DO MASCOTE
        //
        // GET: /api/tamagotchi
        // ==========================================

        [HttpGet]
        public IActionResult GetMascote()
        {
            return Ok(_mascote);
        }


        // ==========================================
        // ESCOLHER POKÉMON
        //
        // POST: /api/tamagotchi/escolher
        // ==========================================

        [HttpPost("escolher")]
        public IActionResult EscolherPokemon(
            [FromBody] EscolhaPokemon escolha)
        {
            // Verifica se recebeu um Pokémon

            if (
                escolha == null ||
                string.IsNullOrWhiteSpace(
                    escolha.Pokemon
                )
            )
            {
                return BadRequest(new
                {
                    mensagem =
                        "Nenhum Pokémon foi escolhido."
                });
            }


            // Salva o Pokémon

            _mascote.Pokemon =
                escolha.Pokemon;


            // Por enquanto o nome
            // será igual ao Pokémon

            _mascote.Nome =
                escolha.Pokemon;


            // Reseta os status
            // quando um novo Pokémon é escolhido

            _mascote.Fome = 50;
            _mascote.Humor = 50;
            _mascote.Sono = 0;
            _mascote.Energia = 100;
            _mascote.Vida = 100;

            _mascote.Nivel = 1;
            _mascote.Experiencia = 0;


            return Ok(_mascote);
        }


        // ==========================================
        // ALIMENTAR
        //
        // POST: /api/tamagotchi/alimentar
        // ==========================================

        [HttpPost("alimentar")]
        public IActionResult Alimentar()
        {
            _mascote.Alimentar();

            return Ok(_mascote);
        }


        // ==========================================
        // BRINCAR
        //
        // POST: /api/tamagotchi/brincar
        // ==========================================

        [HttpPost("brincar")]
        public IActionResult Brincar()
        {
            _mascote.Brincar();

            return Ok(_mascote);
        }


        // ==========================================
        // DORMIR
        //
        // POST: /api/tamagotchi/dormir
        // ==========================================

        [HttpPost("dormir")]
        public IActionResult Dormir()
        {
            _mascote.Dormir();

            return Ok(_mascote);
        }


        // ==========================================
        // FAZER CARINHO
        //
        // POST: /api/tamagotchi/carinho
        // ==========================================

        [HttpPost("carinho")]
        public IActionResult FazerCarinho()
        {
            _mascote.FazerCarinho();

            return Ok(_mascote);
        }


        // ==========================================
        // DAR BANHO
        //
        // POST: /api/tamagotchi/banho
        // ==========================================

        [HttpPost("banho")]
        public IActionResult DarBanho()
        {
            _mascote.DarBanho();

            return Ok(_mascote);
        }


        // ==========================================
        // PASSAGEM DE TEMPO
        //
        // POST: /api/tamagotchi/tempo
        // ==========================================

        [HttpPost("tempo")]
        public IActionResult PassarTempo()
        {
            _mascote.PassarTempo();

            return Ok(_mascote);
        }


        // ==========================================
        // STATUS
        //
        // GET: /api/tamagotchi/status
        // ==========================================

        [HttpGet("status")]
        public IActionResult Status()
        {
            return Ok(_mascote);
        }
    }


    // ==========================================
    // CLASSE PARA RECEBER O POKÉMON ESCOLHIDO
    // ==========================================

    public class EscolhaPokemon
    {
        public string Pokemon { get; set; } =
            string.Empty;
    }
}