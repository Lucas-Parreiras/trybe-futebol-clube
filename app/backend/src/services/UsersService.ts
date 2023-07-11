import * as bcrypt from 'bcryptjs';
import UsersModel from '../models/UsersModel';
import { IUsersModel } from '../Interfaces/Users/IUsersModel';
import { ServResponse } from '../Interfaces/ServiceResponse';
import jwtUtil, { Token } from '../utils/jwt.util';
import TokenAuth from '../utils/token.util';
import { TokenHandler } from '../Interfaces/TokenHandler';

class UsersService {
  constructor(
    private usersModel: IUsersModel = new UsersModel(),
    private tokenDec: TokenHandler = new TokenAuth(),
  ) { }

  async findUserByEmail(emailParam: string, password: string): Promise<ServResponse<Token>> {
    const foundUser = await this.usersModel.findUser(emailParam);
    if (foundUser === null || !bcrypt.compareSync(password, foundUser.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const { id, email } = foundUser;

    const token = jwtUtil.sign({ id, email });

    return { status: 'SUCESSFUL', data: { token } };
  }

  async findUserRole(token: string): Promise<ServResponse<string>> {
    const decoded = this.tokenDec.decodeToken(token);

    const foundUser = await this.usersModel.findUser(decoded);
    if (!foundUser) {
      return { status: 'UNAUTHORIZED', data: { message: 'Token must be a valid token' } };
    }

    return { status: 'SUCESSFUL', data: foundUser.role };
  }
}

export default UsersService;
