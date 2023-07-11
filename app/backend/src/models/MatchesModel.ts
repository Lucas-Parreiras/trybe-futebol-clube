import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { MatchesNamesIncluded } from '../Interfaces/Matches/IMatches';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';

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
}

export default MatchesModel;
