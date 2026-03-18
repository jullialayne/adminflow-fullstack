const express = require('express');
const router = express.Router();

const usuariosRoutes = require("./routes/usuariosRoutes"); 
const empresasRoutes = require("./routes/empresasRoutes"); 
const clientesRoutes = require("./routes/clientesRoutes"); 
const fretesRoutes = require("./routes/fretesRoutes"); 
const produtosRoutes = require("./routes/produtosRoutes"); 
const pedidosRoutes = require("./routes/pedidosRoutes"); 
const itensPedidoRoutes = require("./routes/itensPedidoRoutes"); 


router.use('/usuarios', usuariosRoutes);
router.use('/empresas', empresasRoutes);
router.use('/clientes', clientesRoutes);
router.use('/fretes', fretesRoutes);
router.use('/produtos', produtosRoutes);
router.use('/pedidos', pedidosRoutes);
router.use('/itensPedido', itensPedidoRoutes);

module.exports = router;