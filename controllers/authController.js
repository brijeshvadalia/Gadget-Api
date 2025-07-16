const jwt = require('jsonwebtoken');
const config = require('../config/jwt');

exports.login = (req, res) => {
  // In production: Validate credentials against database
  const user = { id: 1, role: 'agent' };
  
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    config.secret,
    { expiresIn: config.expiresIn }
  );
  
  res.json({ token });
};