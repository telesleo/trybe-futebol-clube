import IMatch from '../interfaces/IMatch';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

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
    const createdMatch = await this.matchModel.create(match);

    return createdMatch;
  }
}
