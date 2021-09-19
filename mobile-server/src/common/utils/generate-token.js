import jwt from 'jsonwebtoken';

function generateToken(data) {
  return jwt.sign(data, process.env.JWT_KEY, { expiresIn: '3h' });
}

export default generateToken;
