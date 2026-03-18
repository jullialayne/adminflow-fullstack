const db = require('../database'); // index.js conecta ao banco

module.exports = {
  async listar(req, res) {
    const usuarios = await db.Usuarios.findAll();
    res.json(usuarios);
  },
  async criar(req, res) { /* ... */ },
  async atualizar(req, res) { /* ... */ },
  async excluir(req, res) { /* ... */ }
};