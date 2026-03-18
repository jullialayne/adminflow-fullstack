module.exports = (sequelize, DataTypes) => {
  const Fretes = sequelize.define('Fretes', {
    IdFrete: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    IdPedido: { type: DataTypes.INTEGER, allowNull: false },
    Transportadora: { type: DataTypes.STRING(150) },
    ValorFrete: { type: DataTypes.DECIMAL(18,2) },
    DataEnvio: { type: DataTypes.DATE },
    DataPrevistaEntrega: { type: DataTypes.DATE },
    StatusEntrega: { type: DataTypes.STRING(50) },
    DataCriacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    DataAtualizacao: { type: DataTypes.DATE }
  }, { tableName: 'Fretes', timestamps: false });

  Fretes.associate = models => {
    Fretes.belongsTo(models.Pedidos, { foreignKey: 'IdPedido' });
  };

  return Fretes;
};