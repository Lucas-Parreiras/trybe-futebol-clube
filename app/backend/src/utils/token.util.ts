import * as jwt from 'jsonwebtoken';
import { TokenHandler } from '../Interfaces/TokenHandler';

const secret = process.env.JWT_SECRET || 'secret';

class TokenAuth implements TokenHandler {
  private handler = jwt;

  verifyToken(token: string): boolean {
    try {
      this.handler.verify(token, secret);
      return true;
    } catch (error) {
      return false;
    }
  }

  decodeToken(token: string): string {
    const decoded = this.handler.decode(token, { complete: true });
    if (!decoded) return 'Decoded fail';

    return decoded.payload.email;
  }
}

export default TokenAuth;
