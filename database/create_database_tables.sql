CREATE DATABASE AdminFlow
go

USE ADMINFLOW
GO
/* =========================
   TABELA EMPRESAS
========================= */
CREATE TABLE Empresas (
    IdEmpresa INT IDENTITY(1,1) PRIMARY KEY,
    Nome VARCHAR(150) NOT NULL,
    CNPJ VARCHAR(20),
    Ativo BIT DEFAULT 1,
    DataCriacao DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    DataAtualizacao DATETIME2 NULL
);

/* =========================
   TABELA USUARIOS
========================= */
CREATE TABLE Usuarios (
    IdUsuario INT IDENTITY(1,1) PRIMARY KEY,
    IdEmpresa INT NOT NULL,
    Nome VARCHAR(150) NOT NULL,
    Email VARCHAR(150) NOT NULL,
    SenhaHash VARCHAR(255) NOT NULL,
    Perfil VARCHAR(50),
    Ativo BIT DEFAULT 1,
    DataCriacao DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    DataAtualizacao DATETIME2 NULL,

    CONSTRAINT FK_Usuarios_Empresas
        FOREIGN KEY (IdEmpresa)
        REFERENCES Empresas(IdEmpresa)
);
/* =========================
   TABELA CLIENTES
========================= */
CREATE TABLE Clientes (
    IdCliente INT IDENTITY(1,1) PRIMARY KEY,
    IdEmpresa INT NOT NULL,
    Nome VARCHAR(150) NOT NULL,
    Documento VARCHAR(30),
    Email VARCHAR(150),
    Telefone VARCHAR(30),
    Cidade VARCHAR(100),
    Estado VARCHAR(50),
    DataCriacao DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    DataAtualizacao DATETIME2 NULL,

    CONSTRAINT FK_Clientes_Empresas
        FOREIGN KEY (IdEmpresa)
        REFERENCES Empresas(IdEmpresa)
);
/* =========================
   TABELA PEDIDOS
========================= */
CREATE TABLE Pedidos (
    IdPedido INT IDENTITY(1,1) PRIMARY KEY,
    IdEmpresa INT NOT NULL,
    IdCliente INT NOT NULL,
    IdUsuario INT NOT NULL,
    DataPedido DATETIME2 DEFAULT SYSDATETIME(),
    ValorTotal DECIMAL(18,2) DEFAULT 0,
    Status VARCHAR(50) DEFAULT 'ABERTO',
    DataCriacao DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    DataAtualizacao DATETIME2 NULL,

    CONSTRAINT FK_Pedidos_Empresas FOREIGN KEY (IdEmpresa) REFERENCES Empresas(IdEmpresa),
    CONSTRAINT FK_Pedidos_Clientes FOREIGN KEY (IdCliente) REFERENCES Clientes(IdCliente),
    CONSTRAINT FK_Pedidos_Usuarios FOREIGN KEY (IdUsuario) REFERENCES Usuarios(IdUsuario)
);

/* =========================
   TABELA Produtos
========================= */
CREATE TABLE Produtos (
    IdProduto INT IDENTITY(1,1) PRIMARY KEY,
    IdEmpresa INT NOT NULL,
    Nome VARCHAR(150) NOT NULL,
    Descricao VARCHAR(500),
    Preco DECIMAL(18,2) NOT NULL,
    Ativo BIT DEFAULT 1,
    DataCriacao DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    DataAtualizacao DATETIME2 NULL,

    CONSTRAINT FK_Produtos_Empresas
        FOREIGN KEY (IdEmpresa)
        REFERENCES Empresas(IdEmpresa)
);

/* =========================
   TABELA PEDIDOS
========================= */
CREATE TABLE Pedidos (
    IdPedido INT IDENTITY(1,1) PRIMARY KEY,
    IdEmpresa INT NOT NULL,
    IdCliente INT NOT NULL,
    IdUsuario INT NOT NULL,
    DataPedido DATETIME2 DEFAULT SYSDATETIME(),
    ValorTotal DECIMAL(18,2) DEFAULT 0,
    Status VARCHAR(50) DEFAULT 'ABERTO',
    DataCriacao DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    DataAtualizacao DATETIME2 NULL,
    CONSTRAINT FK_Pedidos_Empresas FOREIGN KEY (IdEmpresa) REFERENCES Empresas(IdEmpresa),
    CONSTRAINT FK_Pedidos_Clientes FOREIGN KEY (IdCliente) REFERENCES Clientes(IdCliente),
    CONSTRAINT FK_Pedidos_Usuarios FOREIGN KEY (IdUsuario) REFERENCES Usuarios(IdUsuario)
);
/* =========================
   TABELA ITENS PEDIDO
========================= */
CREATE TABLE ItensPedido (
    IdItemPedido INT IDENTITY(1,1) PRIMARY KEY,
    IdPedido INT NOT NULL,
    IdProduto INT NOT NULL,
    Quantidade INT NOT NULL,
    ValorUnitario DECIMAL(18,2) NOT NULL,
    ValorTotal AS (Quantidade * ValorUnitario),
    DataCriacao DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    DataAtualizacao DATETIME2 NULL,
    CONSTRAINT FK_ItensPedido_Pedidos FOREIGN KEY (IdPedido) REFERENCES Pedidos(IdPedido),
    CONSTRAINT FK_ItensPedido_Produtos FOREIGN KEY (IdProduto) REFERENCES Produtos(IdProduto)
);



/* =========================
   TABELA FRETES
========================= */

CREATE TABLE Fretes (
    IdFrete INT IDENTITY(1,1) PRIMARY KEY,
    IdPedido INT NOT NULL,
    Transportadora VARCHAR(150),
    ValorFrete DECIMAL(18,2),
    DataEnvio DATETIME2,
    DataPrevistaEntrega DATETIME2,
    StatusEntrega VARCHAR(50),
    DataCriacao DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    DataAtualizacao DATETIME2 NULL,

    CONSTRAINT FK_Fretes_Pedidos
        FOREIGN KEY (IdPedido)
        REFERENCES Pedidos(IdPedido)
);

