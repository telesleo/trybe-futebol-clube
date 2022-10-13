import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMatch from '../interfaces/IMatch';
import ITeam, { ILeaderboardTeam } from '../interfaces/ITeam';

export default class LeaderboardService {
  constructor(private teamModel: typeof Team, private matchModel: typeof Match) { }

  async getAllHomeTeams() {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll();

    const leaderboardTeams = LeaderboardService.getTeams(teams, matches);

    const sortedLeaderboard = LeaderboardService.sortTeams(leaderboardTeams);

    return sortedLeaderboard;
  }

  static getTeams(teams: ITeam[], matches: IMatch[]): ILeaderboardTeam[] {
    const leaderboard = teams.map((team) => {
      const name = team.teamName;

      const teamMatches = matches.filter(
        (match) => match.homeTeam === team.id && match.inProgress === false,
      );

      const totalPoints = LeaderboardService.getTotalPoints(teamMatches);

      const totalGames = teamMatches.length;

      const { goalsFavor, goalsOwn, goalsBalance } = LeaderboardService.getGoals(teamMatches);

      const { totalVictories, totalDraws, totalLosses } = LeaderboardService
        .getMatchStatus(teamMatches);

      const efficiency = LeaderboardService.getEfficiency(totalPoints, teamMatches.length);

      return {
        ...{ name, totalPoints, totalGames, totalVictories, totalDraws },
        ...{ totalLosses, goalsFavor, goalsOwn, goalsBalance, efficiency },
      } as ILeaderboardTeam;
    });

    return leaderboard;
  }

  static getTotalPoints(matches: IMatch[]) {
    return matches.reduce((acc, match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        return acc + 3;
      }
      if (match.homeTeamGoals === match.awayTeamGoals) {
        return acc + 1;
      }
      return acc + 0;
    }, 0);
  }

  static getMatchStatus(matches: IMatch[]) {
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;

    matches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        totalVictories += 1;
      } else if (match.homeTeamGoals === match.awayTeamGoals) {
        totalDraws += 1;
      } else {
        totalLosses += 1;
      }
    });

    return {
      totalVictories,
      totalDraws,
      totalLosses,
    };
  }

  static getGoals(matches: IMatch[]) {
    let goalsFavor = 0;
    let goalsOwn = 0;

    matches.forEach((match) => {
      goalsFavor += match.homeTeamGoals;
      goalsOwn += match.awayTeamGoals;
    });

    const goalsBalance = goalsFavor - goalsOwn;

    return {
      goalsFavor,
      goalsOwn,
      goalsBalance,
    };
  }

  static getEfficiency(points: number, numberOfMatches: number) {
    return Number(((points / (numberOfMatches * 3)) * 100).toFixed(2));
  }

  static sortTeams(teams: ILeaderboardTeam[]) {
    return teams.sort((teamA, teamB) => {
      if (teamA.totalPoints > teamB.totalPoints) return -1;
      if (teamA.totalPoints < teamB.totalPoints) return 1;

      if (teamA.totalVictories > teamB.totalVictories) return -0.8;
      if (teamA.totalVictories < teamB.totalVictories) return 0.8;

      if (teamA.goalsBalance > teamB.goalsBalance) return -0.6;
      if (teamA.goalsBalance < teamB.goalsBalance) return 0.6;

      if (teamA.goalsFavor > teamB.goalsFavor) return -0.4;
      if (teamA.goalsFavor < teamB.goalsFavor) return 0.4;

      if (teamA.goalsOwn > teamB.goalsOwn) return 0.2;
      if (teamA.goalsOwn < teamB.goalsOwn) return -0.2;

      return 0;
    });
  }
}
