const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const routes = require('./routes/routes');
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

// MongoDB (CORRETO PARA RENDER)
const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL)
.then(() => console.log("Database Connected"))
.catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});