import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class teamController {
  constructor(private teamService: TeamService) { }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this.teamService.getAll();
      res.json(teams);
    } catch (error) {
      next(error);
    }
  }
}
