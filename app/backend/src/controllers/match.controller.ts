import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class matchController {
  constructor(private matchService: MatchService) {}

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await this.matchService.getAll();
      return res.json(matches);
    } catch (error) {
      return next(error);
    }
  }
}
