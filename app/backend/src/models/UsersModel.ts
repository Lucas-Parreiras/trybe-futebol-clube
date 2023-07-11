import SequelizeUsers from '../database/models/SequelizeUsers';
import { IUser } from '../Interfaces/Users/IUser';
import { IUsersModel } from '../Interfaces/Users/IUsersModel';

class UsersModel implements IUsersModel {
  private model = SequelizeUsers;

  async findUser(email: string): Promise<IUser | null> {
    const foundUser = await this.model.findOne({ where: { email } });
    if (!foundUser) return null;
    return foundUser.dataValues;
  }
}

export default UsersModel;
