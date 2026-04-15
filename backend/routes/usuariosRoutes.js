const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// 🔹 rotas padrão
router.post('/login', usuariosController.autenticarUsuario);
router.get('/', usuariosController.listarUsuarios);
router.get('/:id', usuariosController.buscarUsuario);
router.post('/', usuariosController.criarUsuario);
router.put('/:id', usuariosController.editarUsuario);
router.delete('/:id', usuariosController.removerUsuario);

// 🔐 login
router.post('/login', usuariosController.autenticarUsuario);

module.exports = router;