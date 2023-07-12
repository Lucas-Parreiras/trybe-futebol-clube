import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  constructor(
    private boardService = new LeaderboardService(),
  ) { }

  async allTeamsList(req: Request, res: Response) {
    const teamList = await this.boardService.getLeaderboard();

    return res.status(200).json(teamList);
  }

  async homeBoard(req: Request, res: Response) {
    const board = await this.boardService.getHomeBoard();

    return res.status(200).json(board);
  }

  async awayBoard(req: Request, res: Response) {
    const board = await this.boardService.getAwayBoard();

    return res.status(200).json(board);
  }
}

export default LeaderboardController;
