const express = require('express');
const router = express.Router();
const fretesController = require('../controllers/fretesController');

router.get('/', fretesController.listar);
router.post('/', fretesController.criar);
router.put('/:id', fretesController.atualizar);
router.delete('/:id', fretesController.excluir);

module.exports = router;

/*
roteador.get('/listaFretes', freteController.listaFretes);
roteador.get('/listaFrete/:FRETE_ID', freteController.listaFrete);
roteador.post('/criaFrete', freteController.criarFrete);
roteador.put('/editaFrete/:FRETE_ID', freteController.editarFrete);
roteador.delete('/removeFrete/:FRETE_ID', freteController.removeFrete);

*/