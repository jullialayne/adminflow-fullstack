module.exports = (sequelize, DataTypes) => {
  const Alugueis = sequelize.define('Alugueis', {
    IdAluguel: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    Cliente_Id: { type: DataTypes.INTEGER, allowNull: false },
    Vestido_Id: { type: DataTypes.INTEGER, allowNull: false },

    DataRetirada: { type: DataTypes.DATEONLY, allowNull: false },
    DataDevolucao: { type: DataTypes.DATEONLY, allowNull: false },

    Valor: { type: DataTypes.DECIMAL(10,2) },
    Multa: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },

    Status: { 
      type: DataTypes.STRING(50), 
      defaultValue: 'RESERVADO' 
    },

    DataCriacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    DataAtualizacao: { type: DataTypes.DATE }

  }, { 
    tableName: 'ALUGUEIS', 
    timestamps: false 
  });

  Alugueis.associate = models => {
    Alugueis.belongsTo(models.clientesModel, { foreignKey: 'Cliente_Id' });
    Alugueis.belongsTo(models.vestidosModel, { foreignKey: 'Vestido_Id' });
  };

  return Alugueis;
};