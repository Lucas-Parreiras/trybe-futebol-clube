import { MatchesForTeam } from './ILeaderboard';

export interface ILeaderboardModel {
  allTeamsAndMatches(): Promise<MatchesForTeam[]>;
}
