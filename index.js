const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// ===== IMPORTANDO SEU MODEL =====
const Tarefa = require('./models/Tarefa');

// ===== ROTA PRINCIPAL (RETORNA DADOS DO MONGO) =====
app.get("/", async (req, res) => {
  try {
    const tarefas = await Tarefa.find();
    res.json(tarefas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// ===== ROTAS EXISTENTES =====
const routes = require('./routes/routes');
app.use('/api', routes);

// ===== CONFIG =====
const PORT = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL;

// ===== CONEXÃO + START =====
mongoose.connect(mongoURL)
.then(() => {
  console.log("✅ Database Connected");

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server Started at ${PORT}`);
  });
})
.catch(err => console.log("❌ Erro Mongo:", err));