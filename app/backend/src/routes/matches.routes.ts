import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import TokenValidate from '../middlewares/TokenValidation';
import Validations from '../middlewares/Validations';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
router.patch(
  '/:id/finish',
  TokenValidate.TokenIsValid,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);
router.patch(
  '/:id',
  TokenValidate.TokenIsValid,
  (req: Request, res: Response) => matchesController.updateResultMatch(req, res),
);
router.post(
  '/',
  TokenValidate.TokenIsValid,
  Validations.validateIdTeams,
  (req: Request, res: Response) => matchesController.createNewMatchC(req, res),
);

export default router;
