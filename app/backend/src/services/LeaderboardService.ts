import { ILeaderboard } from '../Interfaces/Leaderboard/ILeaderboard';
import { ILeaderboardModel } from '../Interfaces/Leaderboard/ILeaderboardModel';
import LeaderboardModel from '../models/LeaderboardModel';
import BoardUtilities from '../utils/board.util';

class LeaderboardService {
  constructor(
    private boardModel: ILeaderboardModel = new LeaderboardModel(),
  ) { }

  async getLeaderboard(): Promise<ILeaderboard[]> {
    const list = await this.boardModel.allTeamsAndMatches();

    const LeaderboardArr = list.map((m) => BoardUtilities.getGames(m));

    const sortedBoard = BoardUtilities.sortBoard(LeaderboardArr);

    return sortedBoard;
  }

  async getHomeBoard(): Promise<ILeaderboard[]> {
    const list = await this.boardModel.allTeamsAndMatches();

    const homeBoard = list.map((m) => BoardUtilities.getHomeGames(m));

    const sortedBoard = BoardUtilities.sortBoard(homeBoard);

    return sortedBoard;
  }

  async getAwayBoard(): Promise<ILeaderboard[]> {
    const list = await this.boardModel.allTeamsAndMatches();

    const awayBoard = list.map((m) => BoardUtilities.getAwayGames(m));

    const sortedBoard = BoardUtilities.sortBoard(awayBoard);

    return sortedBoard;
  }
}

export default LeaderboardService;
