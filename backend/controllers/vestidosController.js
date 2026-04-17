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

async function buscarVestido(req, res) {
  try {
    const { id } = req.params;

    const vestido = await db.vestidosModel.findByPk(id);

    return res.json(vestido || false);
  } catch (e) {
    return res.json("Erro: " + e);
  }
}

async function editarVestido(req, res) {
  try {
    const { id } = req.params;
    const { Nome, Tamanho, Cor, Tema, PrecoAluguel } = req.body;

    const atualizado = await db.vestidosModel.update(
      { Nome, Tamanho, Cor, Tema, PrecoAluguel },
      { where: { IdVestido: id } }
    );

    return res.json(atualizado[0] > 0);
  } catch (e) {
    return res.json("Erro: " + e);
  }
}

async function removerVestido(req, res) {
  try {
    const { id } = req.params;

    const deletado = await db.vestidosModel.destroy({
      where: { IdVestido: id }
    });

    return res.json(deletado > 0);
  } catch (e) {
    return res.json("Erro: " + e);
  }
}

module.exports = {
  criarVestido,
  listarVestidos,
  buscarVestido,
  editarVestido,
  removerVestido
};