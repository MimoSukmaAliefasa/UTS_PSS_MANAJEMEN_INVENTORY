require('dotenv').config(); 
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token missing.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = authenticate;
