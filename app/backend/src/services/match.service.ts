import IMatch from '../interfaces/IMatch';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import AppError, { statusCode } from '../utils/error';

export default class MatchService {
  constructor(private matchModel: typeof Match) { }

  async getAll(): Promise<IMatch[]> {
    const matches = await this.matchModel.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  async getByProgress(inProgress: boolean): Promise<IMatch[]> {
    const matches = await this.matchModel.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  async create(match: IMatch): Promise<IMatch> {
    const homeTeam = await Team.findOne({ where: { id: match.homeTeam } });
    const awayTeam = await Team.findOne({ where: { id: match.awayTeam } });

    if (!homeTeam || !awayTeam) {
      throw new AppError(statusCode.NOT_FOUND, 'There is no team with such id!');
    }

    if (match.homeTeam === match.awayTeam) {
      throw new AppError(
        statusCode.UNAUTHORIZED,
        'It is not possible to create a match with two equal teams',
      );
    }

    const createdMatch = await this.matchModel.create(match);

    return createdMatch;
  }

  async finishMatch(id: number) {
    await this.matchModel.update({
      inProgress: false,
    }, {
      where: { id },
    });
  }
}
