USE ADMINFLOW
GO
-- Empresas
INSERT INTO Empresas (Nome, CNPJ, Ativo) VALUES
('Empresa Alpha','11.111.111/0001-11',1),
('Empresa Beta','22.222.222/0001-22',1),
('Empresa Gamma','33.333.333/0001-33',1),
('Empresa Delta','44.444.444/0001-44',1),
('Empresa Omega','55.555.555/0001-55',1),
('Empresa Nexus','66.666.666/0001-66',1),
('Empresa Prime','77.777.777/0001-77',1),
('Empresa Orion','88.888.888/0001-88',1),
('Empresa Solaris','99.999.999/0001-99',1),
('Empresa Vertex','10.000.000/0001-10',1);

-- Usuarios
INSERT INTO Usuarios (IdEmpresa, Nome, Email, SenhaHash, Perfil, Ativo) VALUES
(1,'Admin Alpha','admin1@demo.com','HASH','ADMIN',1),
(1,'Operador Alpha','op1@demo.com','HASH','OPERADOR',1),
(2,'Admin Beta','admin2@demo.com','HASH','ADMIN',1),
(3,'Admin Gamma','admin3@demo.com','HASH','ADMIN',1),
(4,'Admin Delta','admin4@demo.com','HASH','ADMIN',1),
(5,'Admin Omega','admin5@demo.com','HASH','ADMIN',1),
(6,'Admin Nexus','admin6@demo.com','HASH','ADMIN',1),
(7,'Admin Prime','admin7@demo.com','HASH','ADMIN',1),
(8,'Admin Orion','admin8@demo.com','HASH','ADMIN',1),
(9,'Admin Solaris','admin9@demo.com','HASH','ADMIN',1);

-- Clientes
INSERT INTO Clientes (IdEmpresa, Nome, Documento, Email, Telefone, Cidade, Estado) VALUES
(1,'João Silva','11111111111','joao@demo.com','62999990001','Goiânia','GO'),
(1,'Maria Souza','22222222222','maria@demo.com','62999990002','Goiânia','GO'),
(2,'Pedro Santos','33333333333','pedro@demo.com','11988880001','São Paulo','SP'),
(3,'Ana Lima','44444444444','ana@demo.com','31977770001','Belo Horizonte','MG'),
(4,'Carlos Rocha','55555555555','carlos@demo.com','41966660001','Curitiba','PR'),
(5,'Fernanda Alves','66666666666','fernanda@demo.com','21955550001','Rio de Janeiro','RJ'),
(6,'Bruno Castro','77777777777','bruno@demo.com','51944440001','Porto Alegre','RS'),
(7,'Juliana Melo','88888888888','juliana@demo.com','71933330001','Salvador','BA'),
(8,'Ricardo Nunes','99999999999','ricardo@demo.com','85922220001','Fortaleza','CE'),
(9,'Patricia Gomes','10101010101','patricia@demo.com','61911110001','Brasília','DF');

-- Produtos
INSERT INTO Produtos (IdEmpresa, Nome, Descricao, Preco) VALUES
(1,'Notebook Dell','Notebook i5 16GB',3500),
(1,'Mouse Logitech','Mouse sem fio',120),
(2,'Monitor LG','Monitor 27 polegadas',1400),
(3,'Teclado Mecânico','RGB switch blue',450),
(4,'Cadeira Gamer','Ergonômica',900),
(5,'Headset JBL','Som profissional',380),
(6,'Webcam HD','1080p',250),
(7,'SSD 1TB','Alta velocidade',650),
(8,'Memória 16GB','DDR4',320),
(9,'Impressora HP','Wi-fi',800);

-- Pedidos
INSERT INTO Pedidos (IdEmpresa, IdCliente, IdUsuario, Status) VALUES
(1,1,1,'ABERTO'),
(1,2,2,'FATURADO'),
(2,3,3,'ABERTO'),
(3,4,4,'CANCELADO'),
(4,5,5,'ABERTO'),
(5,6,6,'ABERTO'),
(6,7,7,'FATURADO'),
(7,8,8,'ABERTO'),
(8,9,9,'ABERTO'),
(9,10,10,'ABERTO');

-- ItensPedido
INSERT INTO ItensPedido (IdPedido, IdProduto, Quantidade, ValorUnitario) VALUES
(1,1,1,3500),
(1,2,2,120),
(2,3,1,1400),
(3,4,1,450),
(4,5,1,900),
(5,6,1,380),
(6,7,2,250),
(7,8,1,650),
(8,9,2,320),
(9,10,1,800);

-- Fretes
INSERT INTO Fretes (IdPedido, Transportadora, ValorFrete, DataEnvio, DataPrevistaEntrega, StatusEntrega) VALUES
(1,'Correios',45, SYSDATETIME(), DATEADD(DAY,5,SYSDATETIME()), 'EM TRANSPORTE'),
(2,'Jadlog',60, SYSDATETIME(), DATEADD(DAY,3,SYSDATETIME()), 'ENTREGUE'),
(3,'Correios',40, SYSDATETIME(), DATEADD(DAY,6,SYSDATETIME()), 'EM TRANSPORTE'),
(4,'Azul Cargo',120, SYSDATETIME(), DATEADD(DAY,2,SYSDATETIME()), 'POSTADO'),
(5,'Jadlog',55, SYSDATETIME(), DATEADD(DAY,4,SYSDATETIME()), 'EM TRANSPORTE'),
(6,'Correios',35, SYSDATETIME(), DATEADD(DAY,7,SYSDATETIME()), 'POSTADO'),
(7,'Total Express',70, SYSDATETIME(), DATEADD(DAY,3,SYSDATETIME()), 'ENTREGUE'),
(8,'Correios',50, SYSDATETIME(), DATEADD(DAY,5,SYSDATETIME()), 'EM TRANSPORTE'),
(9,'Jadlog',65, SYSDATETIME(), DATEADD(DAY,4,SYSDATETIME()), 'POSTADO'),
(10,'Correios',48, SYSDATETIME(), DATEADD(DAY,6,SYSDATETIME()), 'EM TRANSPORTE');

-- Atualiza total dos pedidos
UPDATE P
SET ValorTotal = X.Total
FROM Pedidos P
CROSS APPLY (
    SELECT SUM(ValorTotal) Total
    FROM ItensPedido I
    WHERE I.IdPedido = P.IdPedido
) X;
/*
IF OBJECT_ID('Fretes') IS NOT NULL DROP TABLE Fretes;
IF OBJECT_ID('Pedidos') IS NOT NULL DROP TABLE Pedidos;
IF OBJECT_ID('ItensPedido') IS NOT NULL DROP TABLE ItensPedido;
IF OBJECT_ID('Produtos') IS NOT NULL DROP TABLE Produtos;
IF OBJECT_ID('Clientes') IS NOT NULL DROP TABLE Clientes;
IF OBJECT_ID('Usuarios') IS NOT NULL DROP TABLE Usuarios;
IF OBJECT_ID('Empresas') IS NOT NULL DROP TABLE Empresas;

*/