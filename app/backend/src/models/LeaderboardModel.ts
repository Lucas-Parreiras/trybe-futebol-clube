import { MatchesForTeam } from '../Interfaces/Leaderboard/ILeaderboard';
import { ILeaderboardModel } from '../Interfaces/Leaderboard/ILeaderboardModel';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';

class LeaderboardModel implements ILeaderboardModel {
  private model = SequelizeTeams;

  async allTeamsAndMatches(): Promise<MatchesForTeam[]> {
    const AllTeamsListRes = await this.model.findAll({
      include: [
        { model: SequelizeMatches, as: 'homeMatches' },
        { model: SequelizeMatches, as: 'awayMatches' },
      ],
    });

    const ListFinal = AllTeamsListRes.map((team) => team.dataValues) as MatchesForTeam[];
    return ListFinal;
  }
}

export default LeaderboardModel;
