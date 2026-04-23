const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const Tarefa = require('./models/tarefa');

// rota teste
app.get("/", async (req, res) => {
  try {
    const tarefas = await Tarefa.find();
    res.json(tarefas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

const PORT = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL;

// valida se existe
if (!mongoURL) {
  console.error("❌ MONGO_URL não definida");
  process.exit(1);
}

// conexão com log detalhado
mongoose.connect(mongoURL)
.then(() => {
  console.log("✅ Mongo conectado");

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server rodando na porta ${PORT}`);
  });
})
.catch(err => {
  console.error("❌ ERRO AO CONECTAR NO MONGO:");
  console.error(err);
  process.exit(1);
});