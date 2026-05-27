const db = require('../database');

async function criarVestido(req, res) {
  try {
    const { Nome, Tamanho, Cor, Tema, PrecoAluguel, ImagemUrl } = req.body;

    if (!Nome || !PrecoAluguel) {
      return res.status(400).json({ erro: "Nome e Preço de Aluguel são obrigatórios." });
    }

    const vestido = await db.vestidosModel.create({
      Nome,
      Tamanho,
      Cor,
      Tema,
      PrecoAluguel,
      ImagemUrl,
      Status: 'DISPONIVEL',
      DataCriacao: new Date(),
      DataAtualizacao: new Date()
    });

    return res.status(201).json(vestido);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: e.message });
  }
}

async function listarVestidos(req, res) {
  try {
    const vestidos = await db.vestidosModel.findAll();
    return res.json(vestidos);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: e.message });
  }
}

async function buscarVestido(req, res) {
  try {
    const { id } = req.params;
    const vestido = await db.vestidosModel.findByPk(id);

    if (!vestido) {
      return res.status(404).json({ erro: "Vestido não encontrado." });
    }

    return res.json(vestido);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: e.message });
  }
}

async function editarVestido(req, res) {
  try {
    const { id } = req.params;
    const { Nome, Tamanho, Cor, Tema, PrecoAluguel, Status, ImagemUrl } = req.body;

    const vestido = await db.vestidosModel.findByPk(id);
    if (!vestido) {
      return res.status(404).json({ erro: "Vestido não encontrado." });
    }

    await db.vestidosModel.update(
      { 
        Nome, 
        Tamanho, 
        Cor, 
        Tema, 
        PrecoAluguel, 
        Status, 
        ImagemUrl,
        DataAtualizacao: new Date() 
      },
      { where: { IdVestido: id } }
    );

    return res.json({ mensagem: "Vestido atualizado com sucesso." });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: e.message });
  }
}

async function removerVestido(req, res) {
  try {
    const { id } = req.params;

    const vestido = await db.vestidosModel.findByPk(id);
    if (!vestido) {
      return res.status(404).json({ erro: "Vestido não encontrado." });
    }

    await db.vestidosModel.destroy({
      where: { IdVestido: id }
    });

    return res.json({ mensagem: "Vestido removido com sucesso." });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: e.message });
  }
}

module.exports = {
  criarVestido,
  listarVestidos,
  buscarVestido,
  editarVestido,
  removerVestido
};