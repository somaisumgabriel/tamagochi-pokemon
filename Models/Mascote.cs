using System;

namespace TamagotchiPokemon.Models
{
    public class Mascote
    {
        // ==========================================
        // INFORMAÇÕES DO POKÉMON
        // ==========================================

        public string Nome { get; set; } = string.Empty;

        public string Pokemon { get; set; } = string.Empty;


        // ==========================================
        // STATUS
        // ==========================================

        // 0 = sem fome
        // 100 = muita fome
        public int Fome { get; set; } = 50;

        // 0 = triste
        // 100 = muito feliz
        public int Humor { get; set; } = 50;

        // 0 = descansado
        // 100 = muito cansado
        public int Sono { get; set; } = 0;

        // 0 = sem energia
        // 100 = energia máxima
        public int Energia { get; set; } = 100;

        // Vida do Pokémon
        public int Vida { get; set; } = 100;


        // ==========================================
        // EXPERIÊNCIA
        // ==========================================

        public int Nivel { get; set; } = 1;

        public int Experiencia { get; set; } = 0;


        // ==========================================
        // CONSTRUTORES
        // ==========================================

        public Mascote()
        {
        }


        public Mascote(string nome, string pokemon)
        {
            Nome = nome;
            Pokemon = pokemon;
        }


        // ==========================================
        // ALIMENTAR
        // ==========================================

        public void Alimentar()
        {
            // Diminui a fome
            Fome = Math.Max(0, Fome - 20);

            // Recupera um pouco de energia
            Energia = Math.Min(100, Energia + 10);

            // Ganha experiência
            GanharExperiencia(10);
        }


        // ==========================================
        // BRINCAR
        // ==========================================

        public void Brincar()
        {
            // Aumenta o humor
            Humor = Math.Min(100, Humor + 20);

            // Gasta energia
            Energia = Math.Max(0, Energia - 15);

            // Brincar deixa o Pokémon cansado
            Sono = Math.Min(100, Sono + 10);

            // Ganha experiência
            GanharExperiencia(15);
        }


        // ==========================================
        // DORMIR
        // ==========================================

        public void Dormir()
        {
            // Recupera energia
            Energia = 100;

            // Remove o cansaço
            Sono = 0;

            // Recupera um pouco de vida
            Vida = Math.Min(100, Vida + 10);

            // Ganha experiência
            GanharExperiencia(5);
        }


        // ==========================================
        // FAZER CARINHO
        // ==========================================

        public void FazerCarinho()
        {
            // Aumenta o humor
            Humor = Math.Min(100, Humor + 10);

            // Ganha experiência
            GanharExperiencia(5);
        }


        // ==========================================
        // DAR BANHO
        // ==========================================

        public void DarBanho()
        {
            // Aumenta o humor
            Humor = Math.Min(100, Humor + 5);

            // Recupera um pouco de vida
            Vida = Math.Min(100, Vida + 5);

            // Ganha experiência
            GanharExperiencia(5);
        }


        // ==========================================
        // GANHAR EXPERIÊNCIA
        // ==========================================

        private void GanharExperiencia(int quantidade)
        {
            Experiencia += quantidade;


            // Quando chegar em 100 XP
            if (Experiencia >= 100)
            {
                Experiencia -= 100;

                Nivel++;

                // Recupera um pouco de vida ao subir de nível
                Vida = 100;

                // Recupera energia
                Energia = 100;
            }
        }


        // ==========================================
        // PASSAGEM DE TEMPO
        // ==========================================

        public void PassarTempo()
        {
            // O Pokémon fica um pouco mais faminto
            Fome = Math.Min(100, Fome + 1);

            // O Pokémon fica um pouco mais cansado
            Sono = Math.Min(100, Sono + 1);

            // A energia diminui
            Energia = Math.Max(0, Energia - 1);


            // Se estiver com muita fome,
            // começa a perder vida.

            if (Fome >= 90)
            {
                Vida = Math.Max(0, Vida - 1);
            }


            // Se estiver muito cansado,
            // também perde um pouco de vida.

            if (Sono >= 90)
            {
                Vida = Math.Max(0, Vida - 1);
            }
        }
    }
}