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
    const token = req.get('authorization') as string;

    const serviceResponse = await this.usersService.findUserRole(token);

    if (serviceResponse.status !== 'SUCESSFUL') {
      return res.status(401).json(serviceResponse.data);
    }

    return res.status(200).json({ role: serviceResponse.data });
  }
}

export default UsersController;
