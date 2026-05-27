const db = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'secretKeyAdminFlowQuadrilha123';

async function criarUsuario(req, res) {
  try {
    const { Nome, Email, Senha } = req.body;

    if (!Nome || !Email || !Senha) {
      return res.status(400).json({ erro: "Nome, E-mail e Senha são obrigatórios." });
    }

    // Verificar se já existe um usuário com este e-mail
    const emailExistente = await db.usuariosModel.findOne({ where: { Email } });
    if (emailExistente) {
      return res.status(400).json({ erro: "Este e-mail já está cadastrado." });
    }

    const senhaHash = await bcrypt.hash(Senha, 10);

    const usuario = await db.usuariosModel.create({
      Nome,
      Email,
      SenhaHash: senhaHash,
      DataCriacao: new Date(),
      DataAtualizacao: new Date()
    });

    // Retorna dados sem a senha hash
    const usuarioSemSenha = {
      IdUsuario: usuario.IdUsuario,
      Nome: usuario.Nome,
      Email: usuario.Email,
      DataCriacao: usuario.DataCriacao
    };

    return res.status(201).json(usuarioSemSenha);

  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: e.message });
  }
}

async function listarUsuarios(req, res) {
  try {
    const usuarios = await db.usuariosModel.findAll({
      attributes: ['IdUsuario', 'Nome', 'Email', 'DataCriacao']
    });
    return res.json(usuarios);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: e.message });
  }
}

async function buscarUsuario(req, res) {
  try {
    const { id } = req.params;
    const usuario = await db.usuariosModel.findByPk(id, {
      attributes: ['IdUsuario', 'Nome', 'Email', 'DataCriacao']
    });

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    return res.json(usuario);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: e.message });
  }
}

async function autenticarUsuario(req, res) {
  try {
    const { Email, Senha } = req.body;

    if (!Email || !Senha) {
      return res.status(400).json({ erro: "E-mail e Senha são obrigatórios." });
    }

    const usuario = await db.usuariosModel.findOne({
      where: { Email }
    });

    if (!usuario) {
      return res.status(401).json({ erro: "E-mail ou senha incorretos." });
    }

    const senhaValida = await bcrypt.compare(Senha, usuario.SenhaHash);
    if (!senhaValida) {
      return res.status(401).json({ erro: "E-mail ou senha incorretos." });
    }

    // Gerar token JWT válido por 1 dia
    const token = jwt.sign(
      { IdUsuario: usuario.IdUsuario, Email: usuario.Email },
      SECRET_KEY,
      { expiresIn: '1d' }
    );

    return res.json({
      usuario: {
        IdUsuario: usuario.IdUsuario,
        Nome: usuario.Nome,
        Email: usuario.Email
      },
      token
    });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: e.message });
  }
}

async function editarUsuario(req, res) {
  try {
    const { id } = req.params;
    const { Nome, Email } = req.body;

    const usuario = await db.usuariosModel.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    await db.usuariosModel.update(
      { Nome, Email, DataAtualizacao: new Date() },
      { where: { IdUsuario: id } }
    );

    return res.json({ mensagem: "Usuário atualizado com sucesso." });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: e.message });
  }
}

async function removerUsuario(req, res) {
  try {
    const { id } = req.params;

    const usuario = await db.usuariosModel.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    await db.usuariosModel.destroy({
      where: { IdUsuario: id }
    });

    return res.json({ mensagem: "Usuário removido com sucesso." });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: e.message });
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