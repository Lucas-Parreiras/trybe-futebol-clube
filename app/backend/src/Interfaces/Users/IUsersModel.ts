import { IUser } from './IUser';

export interface IUsersModel {
  findUser(email: string): Promise<IUser | null>,
}
