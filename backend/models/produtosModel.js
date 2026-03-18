module.exports = (sequelize, DataTypes) => {
  const Produtos = sequelize.define('Produtos', {
    IdProduto: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    IdEmpresa: { type: DataTypes.INTEGER, allowNull: false },
    Nome: { type: DataTypes.STRING(150), allowNull: false },
    Descricao: { type: DataTypes.STRING(500) },
    Preco: { type: DataTypes.DECIMAL(18,2), allowNull: false },
    Ativo: { type: DataTypes.BOOLEAN, defaultValue: true },
    DataCriacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    DataAtualizacao: { type: DataTypes.DATE }
  }, { tableName: 'Produtos', timestamps: false });

  Produtos.associate = models => {
    Produtos.belongsTo(models.Empresas, { foreignKey: 'IdEmpresa' });
    Produtos.hasMany(models.ItensPedido, { foreignKey: 'IdProduto' });
  };

  return Produtos;
};