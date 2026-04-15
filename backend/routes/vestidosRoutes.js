const express = require('express');
const router = express.Router();
const vestidosController = require('../controllers/vestidosController');

// rotas
router.get('/', vestidosController.listarVestidos);
router.get('/:id', vestidosController.buscarVestido); // se você criou
router.post('/', vestidosController.criarVestido);
router.put('/:id', vestidosController.editarVestido); // se você criou
router.delete('/:id', vestidosController.removerVestido); // se você criou

module.exports = router;