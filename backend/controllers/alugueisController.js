const db = require('../database');
const { Op } = require('sequelize');

async function criarAluguel(req, res) {
  try {
    const { Cliente_Id, Vestido_Id, DataRetirada, DataDevolucao, Valor } = req.body;

    if (!Cliente_Id || !Vestido_Id || !DataRetirada || !DataDevolucao) {
      return res.status(400).json({ erro: "Campos obrigatórios: Cliente_Id, Vestido_Id, DataRetirada e DataDevolucao." });
    }

    // Validar se o cliente existe
    const clienteExists = await db.clientesModel.findByPk(Cliente_Id);
    if (!clienteExists) {
      return res.status(404).json({ erro: "Cliente não encontrado." });
    }

    // Validar se o vestido existe
    const vestidoExists = await db.vestidosModel.findByPk(Vestido_Id);
    if (!vestidoExists) {
      return res.status(404).json({ erro: "Vestido não encontrado." });
    }

    // Verificar conflito de datas de aluguel para o mesmo vestido
    const conflito = await db.alugueisModel.findOne({
      where: {
        Vestido_Id,
        [Op.or]: [
          {
            DataRetirada: {
              [Op.between]: [DataRetirada, DataDevolucao]
            }
          },
          {
            DataDevolucao: {
              [Op.between]: [DataRetirada, DataDevolucao]
            }
          },
          {
            [Op.and]: [
              { DataRetirada: { [Op.lte]: DataRetirada } },
              { DataDevolucao: { [Op.gte]: DataDevolucao } }
            ]
          }
        ]
      }
    });

    if (conflito) {
      return res.status(400).json({ erro: "Este vestido já está alugado/reservado para o período selecionado." });
    }

    const aluguel = await db.alugueisModel.create({
      Cliente_Id,
      Vestido_Id,
      DataRetirada,
      DataDevolucao,
      Valor: Valor || vestidoExists.PrecoAluguel,
      Status: 'RESERVADO',
      DataCriacao: new Date(),
      DataAtualizacao: new Date()
    });

    return res.status(201).json(aluguel);

  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: e.message });
  }
}

async function listarAlugueis(req, res) {
  try {
    const alugueis = await db.alugueisModel.findAll({
      include: [
        { model: db.clientesModel, attributes: ['IdCliente', 'Nome', 'Telefone', 'Email'] },
        { model: db.vestidosModel, attributes: ['IdVestido', 'Nome', 'Tamanho', 'Cor', 'PrecoAluguel', 'ImagemUrl'] }
      ]
    });
    return res.json(alugueis);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: e.message });
  }
}

async function buscarAluguel(req, res) {
  try {
    const { id } = req.params;
    const aluguel = await db.alugueisModel.findByPk(id, {
      include: [
        { model: db.clientesModel, attributes: ['IdCliente', 'Nome', 'Telefone', 'Email'] },
        { model: db.vestidosModel, attributes: ['IdVestido', 'Nome', 'Tamanho', 'Cor', 'PrecoAluguel', 'ImagemUrl'] }
      ]
    });

    if (!aluguel) {
      return res.status(404).json({ erro: "Contrato de aluguel não encontrado." });
    }

    return res.json(aluguel);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: e.message });
  }
}

async function editarAluguel(req, res) {
  try {
    const { id } = req.params;
    const { Cliente_Id, Vestido_Id, DataRetirada, DataDevolucao, Valor, Multa, Status } = req.body;

    const aluguel = await db.alugueisModel.findByPk(id);
    if (!aluguel) {
      return res.status(404).json({ erro: "Aluguel não encontrado." });
    }

    await db.alugueisModel.update(
      { 
        Cliente_Id, 
        Vestido_Id, 
        DataRetirada, 
        DataDevolucao, 
        Valor, 
        Multa, 
        Status,
        DataAtualizacao: new Date()
      },
      { where: { IdAluguel: id } }
    );

    return res.json({ mensagem: "Contrato de aluguel atualizado com sucesso." });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: e.message });
  }
}

async function removerAluguel(req, res) {
  try {
    const { id } = req.params;

    const aluguel = await db.alugueisModel.findByPk(id);
    if (!aluguel) {
      return res.status(404).json({ erro: "Aluguel não encontrado." });
    }

    await db.alugueisModel.destroy({
      where: { IdAluguel: id }
    });

    return res.json({ mensagem: "Aluguel removido com sucesso." });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: e.message });
  }
}

module.exports = {
  criarAluguel,
  listarAlugueis,
  buscarAluguel,
  editarAluguel,
  removerAluguel
};