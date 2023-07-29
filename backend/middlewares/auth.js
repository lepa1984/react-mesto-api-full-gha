const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;
  if (!authorization) {
    next(new AuthError('Необходима авторизация'));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'super-secret'
    );
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
    return;
  }

  req.user = payload;
  next();
};
