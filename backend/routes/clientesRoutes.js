const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

router.get('/', clientesController.listar);
router.post('/', clientesController.criar);
router.put('/:id', clientesController.atualizar);
router.delete('/:id', clientesController.excluir);

module.exports = router;

/*
roteador.get('/listaCadastros/:TIPOCADASTRO', cadastroController.listaCadastros);
roteador.get('/listaCadastro/:CADASTRO_ID', cadastroController.listaCadastro);
roteador.post('/criaCadastro', cadastroController.criarCadastro);
roteador.put('/editaCadastro/:CADASTRO_ID', cadastroController.editarCadastro);
roteador.delete('/removeCadastro/:CADASTRO_ID', cadastroController.removeCadastro);
*/