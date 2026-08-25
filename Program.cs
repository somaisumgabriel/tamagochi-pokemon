using TamagotchiPokemon;

var builder = WebApplication.CreateBuilder(args);

// ==========================================
// CONFIGURAÇÃO DOS CONTROLLERS
// ==========================================

builder.Services.AddControllers();

// ==========================================
// SERVIÇO AUTOMÁTICO DO TAMAGOTCHI
// ==========================================

builder.Services.AddHostedService<TamagotchiService>();

// ==========================================
// CRIAÇÃO DA APLICAÇÃO
// ==========================================

var app = builder.Build();

// ==========================================
// ARQUIVOS DO WWWROOT
// ==========================================

app.UseDefaultFiles();
app.UseStaticFiles();

// ==========================================
// API DO TAMAGOTCHI
// ==========================================

app.MapControllers();

// ==========================================
// INICIAR SERVIDOR
// ==========================================

app.Run();