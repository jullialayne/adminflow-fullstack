const db = require('../database');

async function criarCliente(req, res) {
  try {
    const { Nome, Telefone, Email } = req.body;

    const cliente = await db.clientesModel.create({
      Nome,
      Telefone,
      Email
    });

    return res.json(cliente); // retorna o objeto criado
  } catch (e) {
    return res.json("Erro: " + e);
  }
}

async function listarClientes(req, res) {
  try {
    const clientes = await db.clientesModel.findAll();
    return res.json(clientes);
  } catch (e) {
    return res.json("Erro: " + e);
  }
}

async function removerCliente(req, res) {
  try {
    const { id } = req.params;

    const deletado = await db.clientesModel.destroy({
      where: { IdCliente: id }
    });

    return res.json(deletado > 0);
  } catch (e) {
    return res.json("Erro: " + e);
  }
}

async function buscarCliente(req, res) {
  const { id } = req.params;

  const cliente = await db.clientesModel.findByPk(id);
  return res.json(cliente || false);
}

async function editarCliente(req, res) {
  const { id } = req.params;
  const { Nome, Telefone, Email } = req.body;

  const atualizado = await db.clientesModel.update(
    { Nome, Telefone, Email },
    { where: { IdCliente: id } }
  );

  return res.json(atualizado[0] > 0);
}

module.exports = { buscarCliente, criarCliente, listarClientes, removerCliente };