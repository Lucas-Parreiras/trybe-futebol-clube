import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const boardController = new LeaderboardController();

const router = Router();

router.get('/', (req: Request, res: Response) => boardController.allTeamsList(req, res));
router.get('/home', (req: Request, res: Response) => boardController.homeBoard(req, res));
router.get('/away', (req: Request, res: Response) => boardController.awayBoard(req, res));

export default router;
