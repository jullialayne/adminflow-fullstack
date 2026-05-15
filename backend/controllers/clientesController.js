const db = require('../database');

async function criarCliente(req, res) {

  try {

    const cliente = await db.clientesModel.create({
      ...req.body,
      DATACRIACAO: new Date(),
      DATAATUALIZACAO: new Date()
    });

    return res.json(cliente);

  } catch (e) {

    console.error(e);

    return res.status(500).json({
      erro: e.message
    });
  }
}

async function listarClientes(req, res) {
  try {
    const clientes = await db.clientesModel.findAll();
    return res.json(clientes);
  } catch (error) {
  console.error(error);

  res.status(500).json({
    erro: error.message,
    original: error.original?.message
  });
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

  try {

    const { id } = req.params;

    const atualizado = await db.clientesModel.update(
      {
        ...req.body,
        DATAATUALIZACAO: new Date()
      },
      {
        where: {
          IDCLIENTE: id
        }
      }
    );

    return res.json({
      atualizado: atualizado[0] > 0
    });

  } catch (e) {

    console.error(e);

    return res.status(500).json({
      erro: e.message
    });
  }
}

module.exports = { buscarCliente, criarCliente, listarClientes, removerCliente, editarCliente };