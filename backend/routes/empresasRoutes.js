const express = require('express');
const router = express.Router();
const empresasController = require('../controllers/empresasController');

router.get('/', empresasController.listar);
router.post('/', empresasController.criar);
router.put('/:id', empresasController.atualizar);
router.delete('/:id', empresasController.excluir);

module.exports = router;

/*
roteador.get('/listaEmpresas', empresaController.listaEmpresas);
roteador.get('/listaEmpresa/:EMPRESA_ID', empresaController.listaEmpresa);
roteador.post('/criaEmpresa', empresaController.criarEmpresa);
roteador.put('/editaEmpresa/:EMPRESA_ID', empresaController.editarEmpresa);
roteador.delete('/removeEmpresa/:EMPRESA_ID', empresaController.removeEmpresa);

*/