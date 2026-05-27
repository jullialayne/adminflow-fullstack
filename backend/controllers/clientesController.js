const db = require('../database');

async function criarCliente(req, res) {
  try {
    const { Nome, Telefone, Email } = req.body;
    
    if (!Nome) {
      return res.status(400).json({ erro: "O nome do cliente é obrigatório." });
    }

    const cliente = await db.clientesModel.create({
      Nome,
      Telefone,
      Email,
      DataCriacao: new Date(),
      DataAtualizacao: new Date()
    });

    return res.status(201).json(cliente); // Status 201 Created

  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: e.message });
  }
}

async function listarClientes(req, res) {
  try {
    const clientes = await db.clientesModel.findAll();
    return res.json(clientes);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: e.message });
  }
}

async function buscarCliente(req, res) {
  try {
    const { id } = req.params;
    const cliente = await db.clientesModel.findByPk(id);
    
    if (!cliente) {
      return res.status(404).json({ erro: "Cliente não encontrado." });
    }
    
    return res.json(cliente);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: e.message });
  }
}

async function editarCliente(req, res) {
  try {
    const { id } = req.params;
    const { Nome, Telefone, Email } = req.body;

    const cliente = await db.clientesModel.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ erro: "Cliente não encontrado." });
    }

    await db.clientesModel.update(
      {
        Nome,
        Telefone,
        Email,
        DataAtualizacao: new Date()
      },
      {
        where: { IdCliente: id }
      }
    );

    return res.json({ mensagem: "Cliente atualizado com sucesso." });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: e.message });
  }
}

async function removerCliente(req, res) {
  try {
    const { id } = req.params;
    
    const cliente = await db.clientesModel.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ erro: "Cliente não encontrado." });
    }

    await db.clientesModel.destroy({
      where: { IdCliente: id }
    });

    return res.json({ mensagem: "Cliente removido com sucesso." });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: e.message });
  }
}

module.exports = { buscarCliente, criarCliente, listarClientes, removerCliente, editarCliente };