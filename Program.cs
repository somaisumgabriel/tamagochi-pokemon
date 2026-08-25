var builder = WebApplication.CreateBuilder(args);

// ==========================================
// CONFIGURAÇÃO DOS CONTROLLERS
// ==========================================

builder.Services.AddControllers();


// ==========================================
// CRIAÇÃO DA APLICAÇÃO
// ==========================================

var app = builder.Build();


// ==========================================
// ARQUIVOS DO WWWROOT
// ==========================================

// Permite acessar index.html,
// style.css, script.js, imagens etc.

app.UseDefaultFiles();

app.UseStaticFiles();


// ==========================================
// API DO TAMAGOTCHI
// ==========================================

// Ativa os Controllers

app.MapControllers();


// ==========================================
// INICIAR SERVIDOR
// ==========================================

app.Run();