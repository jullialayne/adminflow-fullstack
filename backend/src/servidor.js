require('dotenv').config();
const express = require("express");
const rotas = require("./rotas");
const cors = require("cors");

const servidor = express();

servidor.use(express.json());
servidor.use(cors()); // 👈 recomendo ativar

servidor.use('/api', rotas);

const porta = 1433;

servidor.listen(process.env.PORT || porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});