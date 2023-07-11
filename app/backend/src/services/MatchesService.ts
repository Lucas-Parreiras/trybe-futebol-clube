import MatchesModel from '../models/MatchesModel';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import { MatchesNamesIncluded } from '../Interfaces/Matches/IMatches';
import { ServResponse } from '../Interfaces/ServiceResponse';

class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) { }

  async findAllMatches(): Promise<ServResponse<MatchesNamesIncluded[]>> {
    const data = await this.matchesModel.getAllMatches();

    return { status: 'SUCESSFUL', data };
  }

  async matchesFilteredByProgress(
    inProgress: boolean,
  ): Promise<ServResponse<MatchesNamesIncluded[]>> {
    const allMatches = await this.matchesModel.getAllMatches();

    const filtered = allMatches.filter((match) => match.inProgress === inProgress);

    return { status: 'SUCESSFUL', data: filtered };
  }

  async finishMatchById(id: number): Promise<ServResponse<string>> {
    const updated = await this.matchesModel.updateProgressMatch(id);

    if (!updated) {
      return { status: 'BAD_REQUEST', data: { message: 'Erro' } };
    }

    return { status: 'SUCESSFUL', data: 'Finished' };
  }
}

export default MatchesService;
