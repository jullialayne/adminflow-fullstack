const express = require('express');
const router = express.Router();

/* =========================
   ROTAS DO SISTEMA NOVO
========================= */

const usuariosRoutes = require("../routes/usuariosRoutes");
const clientesRoutes = require("../routes/clientesRoutes");
const vestidosRoutes = require("../routes/vestidosRoutes");
const alugueisRoutes = require("../routes/alugueisRoutes");

/* =========================
   MIDDLEWARE DE ROTAS
========================= */

router.use('/usuarios', usuariosRoutes);
router.use('/clientes', clientesRoutes);
router.use('/vestidos', vestidosRoutes);
router.use('/alugueis', alugueisRoutes);

module.exports = router;