import { Request, Router, Response } from 'express';
import UsersController from '../controllers/UsersController';
import Validations from '../middlewares/Validations';
import TokenValidate from '../middlewares/TokenValidation';

const usersController = new UsersController();

const router = Router();

router.post(
  '/',
  Validations.validateLoginFields,
  Validations.validateLoginInfo,
  (req: Request, res: Response) => usersController.userLogin(req, res),
);

router.get(
  '/role',
  TokenValidate.TokenIsValid,
  (req: Request, res: Response) => usersController.userRole(req, res),
);

export default router;
