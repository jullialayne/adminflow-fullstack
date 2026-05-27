const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'secretKeyAdminFlowQuadrilha123';

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  
  // O token geralmente vem no formato: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ erro: "Acesso negado. Token não fornecido." });
  }

  try {
    const decodificado = jwt.verify(token, SECRET_KEY);
    req.usuario = decodificado; // Anexa os dados do usuário decodificados
    next();
  } catch (error) {
    return res.status(403).json({ erro: "Token inválido ou expirado." });
  }
}

module.exports = autenticarToken;
