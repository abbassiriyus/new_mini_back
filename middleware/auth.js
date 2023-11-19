const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
console.log(token);
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token.slice(7), 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Failed to authenticate token' });
    }

    req.userId = decoded.userId;
    next();
  });
}

module.exports = verifyToken;