const express = require('express');
const router = express.Router();
const alugueisController = require('../controllers/alugueisController');

// rotas
router.get('/', alugueisController.listarAlugueis); // opcional (se criar)
router.get('/:id', alugueisController.buscarAluguel); // opcional
router.post('/', alugueisController.criarAluguel);
router.put('/:id', alugueisController.editarAluguel); // opcional
router.delete('/:id', alugueisController.removerAluguel); // opcional

module.exports = router;