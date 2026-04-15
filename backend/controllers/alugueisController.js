const db = require('../database');
const { Op } = require('sequelize');

async function criarAluguel(req, res) {
  try {
    const { Cliente_Id, Vestido_Id, DataRetirada, DataDevolucao, Valor } = req.body;

    // 🔒 validação de conflito (correta)
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

    // ✅ cria aluguel
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

module.exports = { criarAluguel };