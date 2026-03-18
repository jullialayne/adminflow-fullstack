module.exports = (sequelize, DataTypes) => {
  const ItensPedido = sequelize.define('ItensPedido', {
    IdItemPedido: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    IdPedido: { type: DataTypes.INTEGER, allowNull: false },
    IdProduto: { type: DataTypes.INTEGER, allowNull: false },
    Quantidade: { type: DataTypes.INTEGER, allowNull: false },
    ValorUnitario: { type: DataTypes.DECIMAL(18,2), allowNull: false },
    ValorTotal: { type: DataTypes.VIRTUAL, get() { return this.Quantidade * this.ValorUnitario; } },
    DataCriacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    DataAtualizacao: { type: DataTypes.DATE }
  }, { tableName: 'ItensPedido', timestamps: false });

  ItensPedido.associate = models => {
    ItensPedido.belongsTo(models.Pedidos, { foreignKey: 'IdPedido' });
    ItensPedido.belongsTo(models.Produtos, { foreignKey: 'IdProduto' });
  };

  return ItensPedido;
};