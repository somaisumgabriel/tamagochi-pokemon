using System;
using TamagotchiPokemon.Models;

namespace TamagotchiPokemon.Views
{
    public class TamagotchiView
    {
        public void MostrarMenu(Mascote mascote)
        {
            Console.Clear();

            Console.WriteLine("=================================");
            Console.WriteLine("       TAMAGOTCHI POKÉMON");
            Console.WriteLine("=================================");
            Console.WriteLine();

            Console.WriteLine($"Pokémon: {mascote.Pokemon}");
            Console.WriteLine($"Nome: {mascote.Nome}");
            Console.WriteLine();

            Console.WriteLine("1 - Alimentar");
            Console.WriteLine("2 - Brincar");
            Console.WriteLine("3 - Dormir");
            Console.WriteLine("4 - Fazer carinho");
            Console.WriteLine("5 - Dar banho");
            Console.WriteLine("6 - Ver status");
            Console.WriteLine("0 - Sair");
            Console.WriteLine();

            Console.Write("Escolha uma opção: ");
        }

        public void MostrarStatus(Mascote mascote)
        {
            Console.Clear();

            Console.WriteLine("=================================");
            Console.WriteLine("           STATUS");
            Console.WriteLine("=================================");
            Console.WriteLine();

            Console.WriteLine($"Pokémon: {mascote.Pokemon}");
            Console.WriteLine($"Nome: {mascote.Nome}");
            Console.WriteLine();

            Console.WriteLine($"Fome:    {mascote.Fome}/10");
            Console.WriteLine($"Humor:   {mascote.Humor}/10");
            Console.WriteLine($"Sono:    {mascote.Sono}/10");
            Console.WriteLine($"Energia: {mascote.Energia}/10");

            Console.WriteLine();
            Console.WriteLine("Pressione ENTER para voltar...");
            Console.ReadLine();
        }

        public void MostrarMensagem(string mensagem)
        {
            Console.WriteLine();
            Console.WriteLine(mensagem);
            Console.WriteLine();
            Console.WriteLine("Pressione ENTER para continuar...");
            Console.ReadLine();
        }
    }
}