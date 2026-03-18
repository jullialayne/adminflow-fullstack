const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.listar);
router.post('/', usuariosController.criar);
router.put('/:id', usuariosController.atualizar);
router.delete('/:id', usuariosController.excluir);

module.exports = router;


/*roteador.get('/listaUsuarios/:EMPRESALOGADA', usuarioController.listaUsuarios);
roteador.get('/listaUsuario/:USUARIO_ID', usuarioController.listaUsuario);
roteador.post('/autenticaUsuario', usuarioController.autenticarUsuario);
roteador.post('/criaUsuario', usuarioController.criarUsuario);
roteador.put('/editaUsuario/:USUARIO_ID', usuarioController.editarUsuario);
roteador.delete('/removeUsuario/:USUARIO_ID', usuarioController.removeUsuario);
*/