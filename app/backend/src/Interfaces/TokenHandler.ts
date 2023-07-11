export interface TokenHandler {
  verifyToken(token: string): boolean,
  decodeToken(token: string): string,
}
