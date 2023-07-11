import * as bcrypt from 'bcryptjs';
import UsersModel from '../models/UsersModel';
import { IUsersModel } from '../Interfaces/Users/IUsersModel';
import { ServResponse } from '../Interfaces/ServiceResponse';
import jwtUtil, { Token } from '../utils/jwt.util';

class UsersService {
  constructor(
    private usersModel: IUsersModel = new UsersModel(),
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
    const decoded = await jwtUtil.verify(token);
    const user = await this.usersModel.findUser(decoded.email);
    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Token must be a valid token' } };
    }

    return { status: 'SUCESSFUL', data: decoded.email };
  }
}

export default UsersService;
