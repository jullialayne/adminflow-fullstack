module.exports = (sequelize, DataTypes) => {
  const Vestidos = sequelize.define('Vestidos', {
    IdVestido: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true,
      field: 'IDVESTIDO'
    },

    Nome: { 
      type: DataTypes.STRING(255), 
      allowNull: false,
      field: 'NOME'
    },
    
    Tamanho: { 
      type: DataTypes.STRING(10),
      field: 'TAMANHO'
    },
    
    Cor: { 
      type: DataTypes.STRING(50),
      field: 'COR'
    },
    
    Tema: { 
      type: DataTypes.STRING(100),
      field: 'TEMA'
    },

    PrecoAluguel: { 
      type: DataTypes.DECIMAL(10,2), 
      allowNull: false,
      field: 'PRECO_ALUGUEL'
    },

    Status: { 
      type: DataTypes.STRING(50), 
      defaultValue: 'DISPONIVEL',
      field: 'STATUS'
    },

    ImagemUrl: { 
      type: DataTypes.TEXT,
      field: 'IMAGEM_URL'
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
    tableName: 'VESTIDOS', 
    timestamps: false 
  });

  Vestidos.associate = models => {
    Vestidos.hasMany(models.alugueisModel, { foreignKey: 'Vestido_Id' });
  };

  return Vestidos;
};