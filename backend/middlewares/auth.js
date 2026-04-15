function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.json("Acesso negado");
  }

  try {
    // aqui depois você valida JWT
    next();
  } catch (err) {
    return res.json("Token inválido");
  }
}

module.exports = auth;