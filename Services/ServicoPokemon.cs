using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using TamagotchiPokemon.Models;

namespace TamagotchiPokemon.Services
{
    public class ServicoPokemon
    {
        private static readonly HttpClient client = new HttpClient();

        public async Task<Pokemon?> ObterPokemonAsync(string nomePokemon)
        {
            try
            {
                string url = $"https://pokeapi.co/api/v2/pokemon/{nomePokemon.ToLower()}";
                HttpResponseMessage response = await client.GetAsync(url);

                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"\n[ERRO API]: Pokémon '{nomePokemon}' não encontrado ou API indisponível (Status: {response.StatusCode}).");
                    return null;
                }

                string json = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<Pokemon>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            }
            catch (HttpRequestException)
            {
                Console.WriteLine("\n[ERRO CONEXÃO]: Falha ao conectar à Pokémon API. Verifique sua conexão com a internet.");
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"\n[ERRO DESSERIALIZAÇÃO]: Ocorreu uma falha ao processar os dados: {ex.Message}");
                return null;
            }
        }
    }
}