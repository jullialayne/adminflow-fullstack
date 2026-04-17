const db = require('../database');
const { Op } = require('sequelize');

async function criarAluguel(req, res) {
  try {
    const { Cliente_Id, Vestido_Id, DataRetirada, DataDevolucao, Valor } = req.body;

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
      return res.json("Vestido já está alugado nesse período");
    }

    const aluguel = await db.alugueisModel.create({
      Cliente_Id,
      Vestido_Id,
      DataRetirada,
      DataDevolucao,
      Valor
    });

    return res.json(aluguel);

  } catch (e) {
    return res.json("Erro: " + e);
  }
}

async function listarAlugueis(req, res) {
  try {
    const alugueis = await db.alugueisModel.findAll();
    return res.json(alugueis);
  } catch (e) {
    return res.json("Erro: " + e);
  }
}

async function buscarAluguel(req, res) {
  try {
    const { id } = req.params;
    const aluguel = await db.alugueisModel.findByPk(id);
    return res.json(aluguel || false);
  } catch (e) {
    return res.json("Erro: " + e);
  }
}

async function editarAluguel(req, res) {
  try {
    const { id } = req.params;
    const { Cliente_Id, Vestido_Id, DataRetirada, DataDevolucao, Valor } = req.body;

    const atualizado = await db.alugueisModel.update(
      { Cliente_Id, Vestido_Id, DataRetirada, DataDevolucao, Valor },
      { where: { IdAluguel: id } }
    );

    return res.json(atualizado[0] > 0);
  } catch (e) {
    return res.json("Erro: " + e);
  }
}

async function removerAluguel(req, res) {
  try {
    const { id } = req.params;

    const deletado = await db.alugueisModel.destroy({
      where: { IdAluguel: id }
    });

    return res.json(deletado > 0);
  } catch (e) {
    return res.json("Erro: " + e);
  }
}

module.exports = {
  criarAluguel,
  listarAlugueis,
  buscarAluguel,
  editarAluguel,
  removerAluguel
};