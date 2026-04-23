const express = require("express");
const mongoose = require("mongoose");

const app = express();

// ===== MIDDLEWARE =====
app.use(express.json());

// CORS (simples)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  next();
});

// ===== MODEL (AJUSTE PARA O SEU) =====
const User = require("./models/User"); // <-- IMPORTANTE

// ===== ROTA PRINCIPAL (RETORNA JSON DO BANCO) =====
app.get("/", async (req, res) => {
  try {
    const dados = await User.find(); // busca tudo no Mongo
    res.json(dados);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// ===== ROTAS ADICIONAIS =====
const routes = require("./routes/routes");
app.use("/api", routes);

// ===== CONFIG =====
const PORT = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL;

// ===== CONEXÃO + START SERVER =====
if (!mongoURL) {
  console.log("❌ MONGO_URL não definida");
} else {
  mongoose
    .connect(mongoURL)
    .then(() => {
      console.log("✅ Database Connected");

      app.listen(PORT, "0.0.0.0", () => {
        console.log(`🚀 Server rodando na porta ${PORT}`);
      });
    })
    .catch((err) => {
      console.log("❌ Erro ao conectar no Mongo:", err);
    });
}