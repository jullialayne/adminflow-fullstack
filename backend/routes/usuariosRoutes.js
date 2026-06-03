const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const autenticarToken = require('../middlewares/authMiddleware');

// 🔹 rotas públicas
router.post('/login', usuariosController.autenticarUsuario);
router.post('/', usuariosController.criarUsuario);

// 🔐 rotas protegidas
router.get('/', autenticarToken, usuariosController.listarUsuarios);
router.get('/:id', autenticarToken, usuariosController.buscarUsuario);
router.put('/:id', autenticarToken, usuariosController.editarUsuario);
//router.delete('/:id', autenticarToken, usuariosController.removerUsuario);

module.exports = router;