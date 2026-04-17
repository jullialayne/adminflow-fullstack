module.exports = (sequelize, DataTypes) => {
  const Vestidos = sequelize.define('Vestidos', {
    IdVestido: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    Nome: { type: DataTypes.STRING(255), allowNull: false },
    Tamanho: { type: DataTypes.STRING(10) },
    Cor: { type: DataTypes.STRING(50) },
    Tema: { type: DataTypes.STRING(100) },

    PrecoAluguel: { type: DataTypes.DECIMAL(10,2), allowNull: false },

    Status: { 
      type: DataTypes.STRING(50), 
      defaultValue: 'DISPONIVEL' 
    },

    ImagemUrl: { type: DataTypes.TEXT },

    DataCriacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    DataAtualizacao: { type: DataTypes.DATE }

  }, { 
    tableName: 'VESTIDOS', 
    timestamps: false 
  });

  Vestidos.associate = models => {
    Vestidos.hasMany(models.alugueisModel, { foreignKey: 'Vestido_Id' });
  };

  return Vestidos;
};