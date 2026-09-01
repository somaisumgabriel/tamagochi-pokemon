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
            Fome = Math.Max(0, Fome - 20);
            Energia = Math.Min(100, Energia + 10);

            // XP reduzido
            GanharExperiencia(2);
        }

        // ==========================================
        // BRINCAR
        // ==========================================

        public void Brincar()
        {
            Humor = Math.Min(100, Humor + 20);
            Energia = Math.Max(0, Energia - 15);
            Sono = Math.Min(100, Sono + 10);

            // XP reduzido
            GanharExperiencia(3);
        }

        // ==========================================
        // DORMIR
        // ==========================================

        public void Dormir()
        {
            Energia = 100;
            Sono = 0;
            Vida = Math.Min(100, Vida + 10);

            // XP reduzido
            GanharExperiencia(1);
        }

        // ==========================================
        // FAZER CARINHO
        // ==========================================

        public void FazerCarinho()
        {
            Humor = Math.Min(100, Humor + 10);

            // XP reduzido
            GanharExperiencia(1);
        }

        // ==========================================
        // DAR BANHO
        // ==========================================

        public void DarBanho()
        {
            Humor = Math.Min(100, Humor + 5);
            Vida = Math.Min(100, Vida + 5);

            // XP reduzido
            GanharExperiencia(1);
        }

        // ==========================================
        // GANHAR EXPERIÊNCIA
        // ==========================================

        private void GanharExperiencia(int quantidade)
        {
            Experiencia += quantidade;

            // XP necessário aumenta conforme o nível
            int xpNecessario = 50 + ((Nivel - 1) * 25);

            if (Experiencia >= xpNecessario)
            {
                Experiencia -= xpNecessario;
                Nivel++;

                // Recupera tudo ao subir de nível
                Vida = 100;
                Energia = 100;
            }
        }

        // ==========================================
        // RESULTADO DE BATALHA
        // ==========================================

        public void RegistrarResultadoBatalha(bool venceu, int danoRecebido)
        {
            // Aplica o dano que o Pokémon sofreu durante a luta
            Vida = Math.Max(0, Vida - danoRecebido);

            // Batalhar cansa
            Energia = Math.Max(0, Energia - 10);

            if (venceu)
            {
                Humor = Math.Min(100, Humor + 15);

                // XP maior por vencer uma batalha
                GanharExperiencia(15);
            }
            else
            {
                Humor = Math.Max(0, Humor - 10);
            }
        }

        // ==========================================
        // PASSAGEM DE TEMPO
        // ==========================================

        public void PassarTempo()
        {
            // Fica mais faminto
            Fome = Math.Min(100, Fome + 1);

            // Fica mais cansado
            Sono = Math.Min(100, Sono + 1);

            // Perde energia
            Energia = Math.Max(0, Energia - 1);

            // Se estiver com muita fome, perde vida
            if (Fome >= 90)
            {
                Vida = Math.Max(0, Vida - 1);
            }

            // Se estiver muito cansado, perde vida
            if (Sono >= 90)
            {
                Vida = Math.Max(0, Vida - 1);
            }
        }
    }
}