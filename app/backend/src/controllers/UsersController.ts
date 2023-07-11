import { Request, Response } from 'express';
import UsersService from '../services/UsersService';

class UsersController {
  constructor(
    private usersService = new UsersService(),
  ) { }

  async userLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    const serviceResponse = await this.usersService.findUserByEmail(email, password);

    if (serviceResponse.status === 'UNAUTHORIZED') {
      return res.status(401).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  async userRole(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const role = await this.usersService.findUserRole(authorization);
    if (role.status === 'UNAUTHORIZED') {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    return res.status(200).json({ role });
  }
}

export default UsersController;
