const db = require('../database');

async function criarVestido(req, res) {
  try {
    const { Nome, Tamanho, Cor, Tema, PrecoAluguel } = req.body;

    const vestido = await db.vestidosModel.create({
      Nome,
      Tamanho,
      Cor,
      Tema,
      PrecoAluguel
    });

    return res.json(vestido);

  } catch (e) {
    return res.json("Erro: " + e);
  }
}

async function listarVestidos(req, res) {
  try {
    const vestidos = await db.vestidosModel.findAll();
    return res.json(vestidos);
  } catch (e) {
    return res.json("Erro: " + e);
  }
}

module.exports = { criarVestido, listarVestidos };