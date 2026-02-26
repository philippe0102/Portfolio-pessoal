// ── CONFIGURAÇÃO DO AMBIENTE ──
// Carrega variáveis sensíveis do .env para o process.env (segurança)
require("dotenv").config();

// Importação das ferramentas principais para o servidor rodar
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

// Inicializa o app do Express - o "cérebro" da nossa API
const app = express();

// Middleware: ensina o servidor a 'ler' JSON e lidar com Cookies e CORS
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// ── ARQUIVOS ESTÁTICOS (FRONTEND) ──
// Servir arquivos estáticos da pasta public (HTML, CSS, Imagens)
// IMPORTANTE: usamos 'path.join' com '__dirname' para fixar o caminho absoluto.
// Isso garante que o servidor sempre encontre a pasta public, não importa onde ele rode.
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// Rota principal (Login)
app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

// Outras rotas (Portfólio)
app.get("/portfolio", (req, res) => {
    res.sendFile(path.join(publicPath, "portfolio.html"));
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.log("Erro Mongo:", err));

app.use("/api/auth", require("./routes/auth"));

// ── INICIALIZAÇÃO ──
// Verificamos se NÃO estamos em produção (como Vercel) para abrir a porta local
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
        console.log(`🚀 Servidor voando na porta: http://localhost:${PORT}`)
    );
}

module.exports = app;