import { IMatches, MatchesNamesIncluded, resultBody } from './IMatches';

export interface IMatchesModel {
  getAllMatches(): Promise<MatchesNamesIncluded[]>;
  updateProgressMatch(id: number): Promise<boolean>;
  updateResultMatch(id: number, result: resultBody): Promise<string>;
  createNewMatch(data: Partial<IMatches>): Promise<IMatches | null>;
}
