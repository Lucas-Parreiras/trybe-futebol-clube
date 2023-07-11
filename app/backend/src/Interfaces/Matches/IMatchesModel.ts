import { MatchesNamesIncluded } from './IMatches';

export interface IMatchesModel {
  getAllMatches(): Promise<MatchesNamesIncluded[]>;
  updateProgressMatch(id: number): Promise<boolean>;
}
