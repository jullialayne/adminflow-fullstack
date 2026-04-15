const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// 🔹 conforme sua controller
router.get('/', clientesController.listarClientes);
router.get('/:id', clientesController.buscarCliente); // se você criou
router.post('/', clientesController.criarCliente);
router.put('/:id', clientesController.editarCliente); // se tiver
router.delete('/:id', clientesController.removerCliente);

module.exports = router;