/* eslint-disable max-lines-per-function */
import { ILeaderboard, MatchesForTeam } from '../Interfaces/Leaderboard/ILeaderboard';

function getHomeGames(team: MatchesForTeam): ILeaderboard {
  let totalPoints = 0;
  let totalGames = 0;
  let totalVictories = 0;
  let totalDraws = 0;
  let totalLosses = 0;
  let goalsFavor = 0;
  let goalsOwn = 0;
  let goalsBalance = 0;
  let efficiency = 0;

  const homeMatches = team.homeMatches.filter((m) => m.inProgress === false);

  homeMatches.forEach((m) => {
    if (m.homeTeamGoals > m.awayTeamGoals) {
      totalVictories += 1;
      totalGames += 1;
      totalPoints += 3;
      goalsFavor += m.homeTeamGoals;
      goalsOwn += m.awayTeamGoals;
    } else if (m.homeTeamGoals === m.awayTeamGoals) {
      totalDraws += 1;
      totalGames += 1;
      totalPoints += 1;
      goalsFavor += m.homeTeamGoals;
      goalsOwn += m.awayTeamGoals;
    } else {
      totalLosses += 1;
      totalGames += 1;
      goalsFavor += m.homeTeamGoals;
      goalsOwn += m.awayTeamGoals;
    }
  });

  goalsBalance = goalsFavor - goalsOwn;
  efficiency = (totalPoints / (totalGames * 3)) * 100;

  return {
    name: team.teamName,
    totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance,
    efficiency: efficiency.toFixed(2),
  };
}

function getAwayGames(team: MatchesForTeam): ILeaderboard {
  let totalPoints = 0;
  let totalGames = 0;
  let totalVictories = 0;
  let totalDraws = 0;
  let totalLosses = 0;
  let goalsFavor = 0;
  let goalsOwn = 0;
  let goalsBalance = 0;
  let efficiency = 0;

  const awayMatches = team.awayMatches.filter((m) => m.inProgress === false);

  awayMatches.forEach((m) => {
    if (m.homeTeamGoals < m.awayTeamGoals) {
      totalVictories += 1;
      totalGames += 1;
      totalPoints += 3;
      goalsFavor += m.awayTeamGoals;
      goalsOwn += m.homeTeamGoals;
    } else if (m.homeTeamGoals === m.awayTeamGoals) {
      totalDraws += 1;
      totalGames += 1;
      totalPoints += 1;
      goalsFavor += m.awayTeamGoals;
      goalsOwn += m.homeTeamGoals;
    } else {
      totalLosses += 1;
      totalGames += 1;
      goalsFavor += m.awayTeamGoals;
      goalsOwn += m.homeTeamGoals;
    }
  });

  goalsBalance = goalsFavor - goalsOwn;
  efficiency = (totalPoints / (totalGames * 3)) * 100;

  return {
    name: team.teamName,
    totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance,
    efficiency: efficiency.toFixed(2),
  };
}

function getGames(team: MatchesForTeam): ILeaderboard {
  const homeMatches = getHomeGames(team);
  const awayMatches = getAwayGames(team);

  const goalsFavor = homeMatches.goalsFavor + awayMatches.goalsFavor;
  const goalsOwn = homeMatches.goalsOwn + awayMatches.goalsOwn;
  const goalsBalance = goalsFavor - goalsOwn;

  const totalPoints = homeMatches.totalPoints + awayMatches.totalPoints;
  const totalGames = homeMatches.totalGames + awayMatches.totalGames;
  const efficiency = (totalPoints / (totalGames * 3)) * 100;

  return {
    name: homeMatches.name,
    totalPoints,
    totalGames,
    totalVictories: homeMatches.totalVictories + awayMatches.totalVictories,
    totalDraws: homeMatches.totalDraws + awayMatches.totalDraws,
    totalLosses: homeMatches.totalLosses + awayMatches.totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance,
    efficiency: efficiency.toFixed(2),
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
