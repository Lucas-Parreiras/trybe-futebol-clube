import { IMatches } from '../Interfaces/Matches/IMatches';
import {
  ILeaderboard, Info, InfoWithName, MatchesForTeam } from '../Interfaces/Leaderboard/ILeaderboard';

const INITIAL_VALUES = {
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: '',
};

function infosTogether(obj1: InfoWithName, obj2: InfoWithName): InfoWithName {
  const obj3 = {
    name: obj1.name,
    totalPoints: obj1.totalPoints + obj2.totalPoints,
    totalGames: obj1.totalGames + obj2.totalGames,
    totalVictories: obj1.totalVictories + obj2.totalVictories,
    totalDraws: obj1.totalDraws + obj2.totalDraws,
    totalLosses: obj1.totalLosses + obj2.totalLosses,
    goalsFavor: obj1.goalsFavor + obj2.goalsFavor,
    goalsOwn: obj1.goalsOwn + obj2.goalsOwn,
    goalsBalance: obj1.goalsBalance + obj2.goalsBalance,
  };

  const efficiency = ((obj3.totalPoints / (obj3.totalGames * 3)) * 100).toFixed(2);

  return {
    ...obj3,
    efficiency,
  };
}

function getVicDrawLosHome(Matches: IMatches[], obj: Info): Info {
  const infos = { ...obj };
  Matches.forEach((m) => {
    if (m.homeTeamGoals > m.awayTeamGoals) {
      infos.totalVictories += 1;
      infos.totalPoints += 3;
      infos.totalGames += 1;
    } else if (m.homeTeamGoals === m.awayTeamGoals) {
      infos.totalDraws += 1;
      infos.totalPoints += 1;
      infos.totalGames += 1;
    } else {
      infos.totalLosses += 1;
      infos.totalGames += 1;
    }
  });

  return infos;
}

function getVicDrawLosAway(Matches: IMatches[], obj: Info): Info {
  const infos = { ...obj };
  Matches.forEach((m) => {
    if (m.homeTeamGoals < m.awayTeamGoals) {
      infos.totalVictories += 1;
      infos.totalPoints += 3;
      infos.totalGames += 1;
    } else if (m.homeTeamGoals === m.awayTeamGoals) {
      infos.totalDraws += 1;
      infos.totalPoints += 1;
      infos.totalGames += 1;
    } else {
      infos.totalLosses += 1;
      infos.totalGames += 1;
    }
  });

  return infos;
}

function getGoals(Matches: IMatches[], obj: Info, type: string): Info {
  const infos = { ...obj };
  Matches.forEach((m) => {
    if (type === 'home') {
      infos.goalsFavor += m.homeTeamGoals;
      infos.goalsOwn += m.awayTeamGoals;
    } else {
      infos.goalsFavor += m.awayTeamGoals;
      infos.goalsOwn += m.homeTeamGoals;
    }
  });

  return infos;
}

function getHomeGames(team: MatchesForTeam): ILeaderboard {
  const teamInitialInfo = {
    ...INITIAL_VALUES,
  };

  const homeMatches = team.homeMatches.filter((m) => m.inProgress === false);

  const teamInfo2 = getVicDrawLosHome(homeMatches, teamInitialInfo);
  const teamInfo3 = getGoals(homeMatches, teamInfo2, 'home');

  teamInfo3.goalsBalance = teamInfo3.goalsFavor - teamInfo3.goalsOwn;
  teamInfo3.efficiency = ((teamInfo3.totalPoints / (teamInfo3.totalGames * 3)) * 100).toFixed(2);

  return {
    name: team.teamName,
    ...teamInfo3,
  };
}

function getAwayGames(team: MatchesForTeam): ILeaderboard {
  const teamInitialInfo = {
    ...INITIAL_VALUES,
  };

  const awayMatches = team.awayMatches.filter((m) => m.inProgress === false);

  const teamInfo2 = getVicDrawLosAway(awayMatches, teamInitialInfo);
  const teamInfo3 = getGoals(awayMatches, teamInfo2, 'away');

  teamInfo3.goalsBalance = teamInfo3.goalsFavor - teamInfo3.goalsOwn;
  teamInfo3.efficiency = ((teamInfo3.totalPoints / (teamInfo3.totalGames * 3)) * 100).toFixed(2);

  return {
    name: team.teamName,
    ...teamInfo3,
  };
}

function getGames(team: MatchesForTeam): ILeaderboard {
  const homeInfo = getHomeGames(team);
  const awayInfo = getAwayGames(team);

  const allInfo = infosTogether(homeInfo, awayInfo);

  return {
    ...allInfo,
  };
}

function sortBoard(board: ILeaderboard[]): ILeaderboard[] {
  const sorted = board.sort((a, b) => {
    if (b.totalPoints - a.totalPoints !== 0) {
      return b.totalPoints - a.totalPoints;
    }
    if (b.totalVictories - a.totalVictories !== 0) {
      return b.totalVictories - a.totalVictories;
    }
    if (b.goalsBalance - a.goalsBalance !== 0) {
      return b.goalsBalance - a.goalsBalance;
    }
    return b.goalsFavor - a.goalsFavor;
  });

  return sorted;
}

const BoardUtilities = {
  getHomeGames,
  getAwayGames,
  getGames,
  sortBoard,
};

export default BoardUtilities;
