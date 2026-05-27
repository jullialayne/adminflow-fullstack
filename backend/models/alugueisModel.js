module.exports = (sequelize, DataTypes) => {
  const Alugueis = sequelize.define('Alugueis', {
    IdAluguel: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true,
      field: 'IDALUGUEL'
    },

    Cliente_Id: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      field: 'CLIENTE_ID'
    },
    
    Vestido_Id: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      field: 'VESTIDO_ID'
    },

    DataRetirada: { 
      type: DataTypes.DATEONLY, 
      allowNull: false,
      field: 'DATA_RETIRADA'
    },
    
    DataDevolucao: { 
      type: DataTypes.DATEONLY, 
      allowNull: false,
      field: 'DATA_DEVOLUCAO'
    },

    Valor: { 
      type: DataTypes.DECIMAL(10,2),
      field: 'VALOR'
    },
    
    Multa: { 
      type: DataTypes.DECIMAL(10,2), 
      defaultValue: 0,
      field: 'MULTA'
    },

    Status: { 
      type: DataTypes.STRING(50), 
      defaultValue: 'RESERVADO',
      field: 'STATUS'
    },

    DataCriacao: { 
      type: DataTypes.DATE, 
      defaultValue: DataTypes.NOW,
      field: 'DATACRIACAO'
    },
    
    DataAtualizacao: { 
      type: DataTypes.DATE,
      field: 'DATAATUALIZACAO'
    }

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