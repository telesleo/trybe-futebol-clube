import * as dotenv from 'dotenv';
import ITeam from '../interfaces/ITeam';
import Team from '../database/models/Team';

dotenv.config();

export default class TeamService {
  constructor(private teamModel: typeof Team) { }

  async getAll(): Promise<ITeam[]> {
    const teams = await this.teamModel.findAll();

    return teams;
  }
}
