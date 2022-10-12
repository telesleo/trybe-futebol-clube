import { NextFunction, Request, Response } from 'express';
import IMatch from '../interfaces/IMatch';
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

  async create(req: Request, res: Response, next: NextFunction) {
    const match = req.body as IMatch;

    try {
      const createdMatch = await this.matchService.create(match);
      return res.status(201).json(createdMatch);
    } catch (error) {
      return next(error);
    }
  }

  async upgrateProgress(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id, 10);

    try {
      await this.matchService.finishMatch(id);
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      return next(error);
    }
  }
}
