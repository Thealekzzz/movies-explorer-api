import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError.js';

const { NODE_ENV, PRIVATE_KEY } = process.env;

function auth(req, res, next) {
  let { token } = req.cookies || {};

  if (!token) {
    token = req.headers.token;
  }

  if (!token) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? PRIVATE_KEY : '4a952aade591adfb64a57f228cb6c039');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  req.user = payload;

  next();
}

export default auth;
