const express = require('express');
const router = express.Router();
const itensPedidoController = require('../controllers/itensPedidoController');

router.get('/', itensPedidoController.listar);
router.post('/', itensPedidoController.criar);
router.put('/:id', itensPedidoController.atualizar);
router.delete('/:id', itensPedidoController.excluir);

module.exports = router;
