module.exports = (sequelize, DataTypes) => {
  const Pedidos = sequelize.define('Pedidos', {
    IdPedido: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    IdEmpresa: { type: DataTypes.INTEGER, allowNull: false },
    IdCliente: { type: DataTypes.INTEGER, allowNull: false },
    IdUsuario: { type: DataTypes.INTEGER, allowNull: false },
    DataPedido: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    ValorTotal: { type: DataTypes.DECIMAL(18,2), defaultValue: 0 },
    Status: { type: DataTypes.STRING(50), defaultValue: 'ABERTO' },
    DataCriacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    DataAtualizacao: { type: DataTypes.DATE }
  }, { tableName: 'Pedidos', timestamps: false });

  Pedidos.associate = models => {
    Pedidos.belongsTo(models.Empresas, { foreignKey: 'IdEmpresa' });
    Pedidos.belongsTo(models.Clientes, { foreignKey: 'IdCliente' });
    Pedidos.belongsTo(models.Usuarios, { foreignKey: 'IdUsuario' });
    Pedidos.hasMany(models.ItensPedido, { foreignKey: 'IdPedido' });
    Pedidos.hasOne(models.Fretes, { foreignKey: 'IdPedido' });
  };

  return Pedidos;
};