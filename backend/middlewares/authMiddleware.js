const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'secretKeyAdminFlowQuadrilha123';

function autenticarToken(req, res, next) {
  console.log('Headers:', req.headers);

  const authHeader = req.headers['authorization'];
  console.log('Authorization:', authHeader);

  const token = authHeader && authHeader.split(' ')[1];
  console.log('Token:', token);

  if (!token) {
    return res.status(401).json({
      erro: "Acesso negado. Token não fornecido."
    });
  }

  try {
    const decodificado = jwt.verify(token, SECRET_KEY);
    console.log('Usuário:', decodificado);

    req.usuario = decodificado;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      erro: "Token inválido ou expirado."
    });
  }
}

module.exports = autenticarToken;
