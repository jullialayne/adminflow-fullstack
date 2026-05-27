const express = require('express');
const router = express.Router();
const autenticarToken = require('../middlewares/authMiddleware');

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
router.use('/clientes', autenticarToken, clientesRoutes);
router.use('/vestidos', autenticarToken, vestidosRoutes);
router.use('/alugueis', autenticarToken, alugueisRoutes);

module.exports = router;