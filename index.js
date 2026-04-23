const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// ===== MODEL (AJUSTE O NOME SE NECESSÁRIO) =====
const User = require('./models/User');

// ===== ROTA PRINCIPAL (MOSTRA DADOS DO BANCO) =====
app.get("/", async (req, res) => {
  try {
    const dados = await User.find();
    res.json(dados);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// ===== ROTAS =====
const routes = require('./routes/routes');
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

// ===== MONGO =====
const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL)
.then(() => {
  console.log("Database Connected");

  // START SERVER (IMPORTANTE no Render)
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server Started at ${PORT}`);
  });
})
.catch(err => console.log(err));