using TamagotchiPokemon.Controllers;

namespace TamagotchiPokemon
{
    public class TamagotchiService : BackgroundService
    {
        protected override async Task ExecuteAsync(
            CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                // Espera 30 segundos
                await Task.Delay(
                    TimeSpan.FromSeconds(30),
                    stoppingToken
                );

                // Faz o tempo passar
                TamagotchiController
                    .MascoteAtual
                    .PassarTempo();
            }
        }
    }
}