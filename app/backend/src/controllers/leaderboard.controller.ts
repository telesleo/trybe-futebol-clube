import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class leaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}

  async getAllHomeTeams(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this.leaderboardService.getAllHomeTeams();
      return res.json(teams);
    } catch (error) {
      return next(error);
    }
  }
}
