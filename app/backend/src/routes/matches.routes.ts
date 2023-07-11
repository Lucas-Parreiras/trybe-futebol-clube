import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import TokenValidate from '../middlewares/TokenValidation';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
router.patch(
  '/:id/finish',
  TokenValidate.TokenIsValid,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

export default router;
