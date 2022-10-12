import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class matchController {
  constructor(private matchService: MatchService) {}

  async getAll(req: Request, res: Response, next: NextFunction) {
    const { inProgress } = req.query;

    try {
      if (inProgress) {
        const matchesByProgress = await this.matchService.getByProgress(inProgress === 'true');
        return res.json(matchesByProgress);
      }
      const matches = await this.matchService.getAll();
      return res.json(matches);
    } catch (error) {
      return next(error);
    }
  }
}
