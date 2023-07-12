export interface IMatches {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export type IncludeNames = {
  teamName: string;
};

export type MatchesNamesIncluded = IMatches & {
  homeTeam: IncludeNames;
  awayTeam: IncludeNames;
};

export type resultBody = {
  homeTeamGoals: number;
  awayTeamGoals: number;
};
