const jwt = require('jsonwebtoken');
const llave = require('../config/auth.config');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).send({ message: 'No se proporcionó token.' });
  }

  jwt.verify(token, llave.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'No esta autorizado. Verifique el token' });
    }
    req.userId = decoded.id;
    next();
  });
};