const express = require('express');
const router = express.Router();

/* =========================
   ROTAS DO SISTEMA NOVO
========================= */

const usuariosRoutes = require("./routes/usuarios.routes");
const clientesRoutes = require("./routes/clientes.routes");
const vestidosRoutes = require("./routes/vestidos.routes");
const alugueisRoutes = require("./routes/alugueis.routes");

/* =========================
   MIDDLEWARE DE ROTAS
========================= */

router.use('/usuarios', usuariosRoutes);
router.use('/clientes', clientesRoutes);
router.use('/vestidos', vestidosRoutes);
router.use('/alugueis', alugueisRoutes);

module.exports = router;