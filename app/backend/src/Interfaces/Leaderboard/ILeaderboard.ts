import { ITeams } from '../Teams/ITeams';
import { IMatches } from '../Matches/IMatches';

export interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}

export type MatchesForTeam = ITeams & {
  homeMatches: IMatches[];
  awayMatches: IMatches[];
};
