const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const Tarefa = require('./models/Tarefa');

// ROTA PRINCIPAL
app.get("/", async (req, res) => {
  try {
    const tarefas = await Tarefa.find();
    res.json(tarefas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

const routes = require('./routes/routes');
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL)
.then(() => console.log("Database Connected"))
.catch(err => console.log(err));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server Started at ${PORT}`);
});