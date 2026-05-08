const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  // Remove "Bearer " do início se existir
  const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
    req.userId = decoded.userId;
    req.username = decoded.username;
    next();
  });
};

module.exports = verifyToken;
