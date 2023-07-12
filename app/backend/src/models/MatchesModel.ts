import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { IMatches, MatchesNamesIncluded, resultBody } from '../Interfaces/Matches/IMatches';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import { NewEntity } from '../Interfaces';

class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  async getAllMatches(): Promise<MatchesNamesIncluded[]> {
    const allMatches = await this.model.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    const allMatchesData = allMatches.map((match) => match.dataValues);

    return allMatchesData as MatchesNamesIncluded[];
  }

  async updateProgressMatch(id: number): Promise<boolean> {
    await this.model.update(
      { inProgress: false },
      { where: { id } },
    );

    return true;
  }

  async updateResultMatch(id: number, result: resultBody): Promise<string> {
    await this.model.update(
      {
        homeTeamGoals: result.homeTeamGoals,
        awayTeamGoals: result.awayTeamGoals,
      },
      { where: { id } },
    );

    return 'Result updaded';
  }

  async createNewMatch(data: Partial<IMatches>): Promise<IMatches | null> {
    const { homeTeamId, awayTeamId } = data;

    const homeTeam = await this.model.findByPk(Number(homeTeamId));
    const awayTeam = await this.model.findByPk(Number(awayTeamId));

    if (!homeTeam || !awayTeam) return null;

    const newMatch = {
      homeTeamId: data.homeTeamId,
      homeTeamGoals: data.homeTeamGoals,
      awayTeamId: data.awayTeamId,
      awayTeamGoals: data.awayTeamGoals,
      inProgress: true,
    } as NewEntity<IMatches>;

    const createdMatch = await this.model.create(newMatch);

    return createdMatch.dataValues;
  }
}

export default MatchesModel;
