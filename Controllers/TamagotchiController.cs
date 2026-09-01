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

        public static Mascote MascoteAtual { get; } = new Mascote();

        // ==========================================
        // PEGAR INFORMAÇÕES DO MASCOTE
        // GET: /api/tamagotchi
        // ==========================================

        [HttpGet]
        public IActionResult GetMascote()
        {
            return Ok(MascoteAtual);
        }

        // ==========================================
        // ESCOLHER POKÉMON
        // POST: /api/tamagotchi/escolher
        // ==========================================

        [HttpPost("escolher")]
        public IActionResult EscolherPokemon(
            [FromBody] EscolhaPokemon escolha)
        {
            if (
                escolha == null ||
                string.IsNullOrWhiteSpace(escolha.Pokemon)
            )
            {
                return BadRequest(new
                {
                    mensagem = "Nenhum Pokémon foi escolhido."
                });
            }

            MascoteAtual.Pokemon = escolha.Pokemon;
            MascoteAtual.Nome = escolha.Pokemon;

            // Reseta os status
            MascoteAtual.Fome = 50;
            MascoteAtual.Humor = 50;
            MascoteAtual.Sono = 0;
            MascoteAtual.Energia = 100;
            MascoteAtual.Vida = 100;
            MascoteAtual.Nivel = 1;
            MascoteAtual.Experiencia = 0;

            return Ok(MascoteAtual);
        }

        // ==========================================
        // ALIMENTAR
        // POST: /api/tamagotchi/alimentar
        // ==========================================

        [HttpPost("alimentar")]
        public IActionResult Alimentar()
        {
            MascoteAtual.Alimentar();

            return Ok(MascoteAtual);
        }

        // ==========================================
        // BRINCAR
        // POST: /api/tamagotchi/brincar
        // ==========================================

        [HttpPost("brincar")]
        public IActionResult Brincar()
        {
            MascoteAtual.Brincar();

            return Ok(MascoteAtual);
        }

        // ==========================================
        // DORMIR
        // POST: /api/tamagotchi/dormir
        // ==========================================

        [HttpPost("dormir")]
        public IActionResult Dormir()
        {
            MascoteAtual.Dormir();

            return Ok(MascoteAtual);
        }

        // ==========================================
        // FAZER CARINHO
        // POST: /api/tamagotchi/carinho
        // ==========================================

        [HttpPost("carinho")]
        public IActionResult FazerCarinho()
        {
            MascoteAtual.FazerCarinho();

            return Ok(MascoteAtual);
        }

        // ==========================================
        // DAR BANHO
        // POST: /api/tamagotchi/banho
        // ==========================================

        [HttpPost("banho")]
        public IActionResult DarBanho()
        {
            MascoteAtual.DarBanho();

            return Ok(MascoteAtual);
        }

        // ==========================================
        // PASSAGEM DE TEMPO
        // POST: /api/tamagotchi/tempo
        // ==========================================

        [HttpPost("tempo")]
        public IActionResult PassarTempo()
        {
            MascoteAtual.PassarTempo();

            return Ok(MascoteAtual);
        }

        // ==========================================
        // STATUS
        // GET: /api/tamagotchi/status
        // ==========================================

        [HttpGet("status")]
        public IActionResult Status()
        {
            return Ok(MascoteAtual);
        }

        // ==========================================
        // REGISTRAR RESULTADO DE BATALHA
        // POST: /api/tamagotchi/batalha
        // ==========================================

        [HttpPost("batalha")]
        public IActionResult RegistrarBatalha(
            [FromBody] ResultadoBatalha resultado)
        {
            if (resultado == null)
            {
                return BadRequest(new
                {
                    mensagem = "Resultado da batalha não informado."
                });
            }

            MascoteAtual.RegistrarResultadoBatalha(
                resultado.Venceu,
                resultado.DanoRecebido
            );

            return Ok(MascoteAtual);
        }
    }

    // ==========================================
    // CLASSE PARA RECEBER O POKÉMON ESCOLHIDO
    // ==========================================

    public class EscolhaPokemon
    {
        public string Pokemon { get; set; } = string.Empty;
    }

    // ==========================================
    // CLASSE PARA RECEBER O RESULTADO DA BATALHA
    // ==========================================

    public class ResultadoBatalha
    {
        public bool Venceu { get; set; }
        public int DanoRecebido { get; set; }
    }
}