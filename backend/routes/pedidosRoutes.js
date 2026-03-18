const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

router.get('/', pedidosController.listar);
router.post('/', pedidosController.criar);
router.put('/:id', pedidosController.atualizar);
router.delete('/:id', pedidosController.excluir);

module.exports = router;
