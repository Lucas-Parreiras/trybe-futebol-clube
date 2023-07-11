import { Request, Response, NextFunction } from 'express';
import TokenAuth from '../utils/token.util';

const jwt = new TokenAuth();

class TokenValidate {
  static TokenIsValid(req: Request, res: Response, next: NextFunction) {
    const token = req.get('authorization');

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const validate = jwt.verifyToken(token);

    if (!validate) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    next();
  }
}

export default TokenValidate;
