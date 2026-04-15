USE ADMINFLOW
GO

/* =========================
   USUARIOS
========================= */
INSERT INTO USUARIOS (NOME, EMAIL, SENHAHASH)
VALUES 
('Admin', 'admin@admin.com', '123456'),
('Jullia', 'jullia@admin.com', '654321');


/* =========================
   CLIENTES
========================= */
INSERT INTO CLIENTES (NOME, TELEFONE, EMAIL)
VALUES
('Ana Souza', '62999990001', 'ana@email.com'),
('Bruna Lima', '62999990002', 'bruna@email.com'),
('Carla Mendes', '62999990003', 'carla@email.com'),
('Juliana Rocha', '62999990004', 'juliana@email.com');


/* =========================
   VESTIDOS
========================= */
INSERT INTO VESTIDOS (NOME, TAMANHO, COR, TEMA, PRECO_ALUGUEL, STATUS, IMAGEM_URL)
VALUES
('Vestido Junino Vermelho', 'M', 'Vermelho', 'Junina', 120.00, 'DISPONIVEL', NULL),
('Vestido Caipira Azul', 'P', 'Azul', 'Junina', 100.00, 'DISPONIVEL', NULL),
('Vestido Luxo Dourado', 'G', 'Dourado', 'Luxo', 250.00, 'DISPONIVEL', NULL),
('Vestido Infantil Colorido', 'P', 'Colorido', 'Infantil', 90.00, 'DISPONIVEL', NULL),
('Vestido Xadrez Clássico', 'M', 'Xadrez', 'Junina', 130.00, 'DISPONIVEL', NULL);


/* =========================
   ALUGUEIS
========================= */
-- Reservado (futuro)
INSERT INTO ALUGUEIS (
    CLIENTE_ID, VESTIDO_ID, DATA_RETIRADA, DATA_DEVOLUCAO, VALOR, STATUS
)
VALUES
(1, 1, '2026-06-10', '2026-06-12', 120.00, 'RESERVADO');

-- Já retirado
INSERT INTO ALUGUEIS (
    CLIENTE_ID, VESTIDO_ID, DATA_RETIRADA, DATA_DEVOLUCAO, VALOR, STATUS
)
VALUES
(2, 2, '2026-04-10', '2026-04-12', 100.00, 'RETIRADO');

-- Devolvido
INSERT INTO ALUGUEIS (
    CLIENTE_ID, VESTIDO_ID, DATA_RETIRADA, DATA_DEVOLUCAO, VALOR, STATUS
)
VALUES
(3, 3, '2026-03-01', '2026-03-03', 250.00, 'DEVOLVIDO');

-- Atrasado
INSERT INTO ALUGUEIS (
    CLIENTE_ID, VESTIDO_ID, DATA_RETIRADA, DATA_DEVOLUCAO, VALOR, MULTA, STATUS
)
VALUES
(4, 4, '2026-04-01', '2026-04-05', 90.00, 20.00, 'ATRASADO');