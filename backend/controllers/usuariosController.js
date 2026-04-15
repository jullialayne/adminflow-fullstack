const db = require('../database');
const bcrypt = require('bcrypt');

async function criarUsuario(req, res) {
  try {
    const { Nome, Email, Senha } = req.body;

    const senhaHash = await bcrypt.hash(Senha, 10);

    const usuario = await db.usuariosModel.create({
      Nome,
      Email,
      SenhaHash: senhaHash
    });

    return res.json(usuario);

  } catch (e) {
    return res.json("Erro: " + e);
  }
}

async function listarUsuarios(req, res) {
  try {
    const usuarios = await db.usuariosModel.findAll();
    return res.json(usuarios);
  } catch (e) {
    return res.json("Erro: " + e);
  }
}

async function buscarUsuario(req, res) {
  try {
    const { id } = req.params;

    const usuario = await db.usuariosModel.findByPk(id);

    return res.json(usuario || false);
  } catch (e) {
    return res.json("Erro: " + e);
  }
}

async function autenticarUsuario(req, res) {
  try {
    const { Email, Senha } = req.body;

    const usuario = await db.usuariosModel.findOne({
      where: { Email }
    });

    if (!usuario) return res.json(false);

    const senhaValida = await bcrypt.compare(Senha, usuario.SenhaHash);

    if (!senhaValida) return res.json(false);

    return res.json(usuario);

  } catch (e) {
    return res.json("Erro: " + e);
  }
}

async function editarUsuario(req, res) {
  try {
    const { id } = req.params;
    const { Nome, Email } = req.body;

    const atualizado = await db.usuariosModel.update(
      { Nome, Email },
      { where: { IdUsuario: id } }
    );

    return res.json(atualizado[0] > 0);

  } catch (e) {
    return res.json("Erro: " + e);
  }
}

async function removerUsuario(req, res) {
  try {
    const { id } = req.params;

    const deletado = await db.usuariosModel.destroy({
      where: { IdUsuario: id }
    });

    return res.json(deletado > 0);

  } catch (e) {
    return res.json("Erro: " + e);
  }
}

module.exports = {
  criarUsuario,
  listarUsuarios,
  buscarUsuario,
  autenticarUsuario,
  editarUsuario,
  removerUsuario
};