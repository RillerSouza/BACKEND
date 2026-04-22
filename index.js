const express = require('express');
const mongoose = require('mongoose');

const app = express();

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, PATCH, DELETE');
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

// ROTA TESTE
app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

// ROTAS
const routes = require('./routes/routes');
app.use('/api', routes);

// PORTA (Render)
const PORT = process.env.PORT || 3000;

// MONGO (Render)
const mongoURL = process.env.MONGO_URL;

if (!mongoURL) {
  console.log("❌ MONGO_URL não definida");
} else {
  mongoose.connect(mongoURL)
    .then(() => console.log("✅ Database Connected"))
    .catch((err) => console.log("❌ Erro Mongo:", err));
}

// START SERVER (IMPORTANTE)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server Started at ${PORT}`);
});