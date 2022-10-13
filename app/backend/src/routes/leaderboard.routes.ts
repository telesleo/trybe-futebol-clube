import { Router, Request, Response, NextFunction } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
import TeamService from '../services/leaderboard.service';
import Team from '../database/models/Team';
import Match from '../database/models/Match';

const leaderboard = Router();

const leaderboardController = new LeaderboardController(new TeamService(Team, Match));

leaderboard.get('/', (req: Request, res: Response, next: NextFunction) =>
  leaderboardController.getAllHomeTeams(req, res, next));

export default leaderboard;
