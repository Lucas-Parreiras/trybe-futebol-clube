import { Router } from 'express';
import teamsRouter from './teams.routes';
import usersRouter from './users.routes';
import matchesRouter from './matches.routes';
import boardRouter from './leaderboard.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', boardRouter);

export default router;
