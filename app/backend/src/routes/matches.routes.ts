import { Router, Request, Response, NextFunction } from 'express';
import MatchController from '../controllers/match.controller';
import MatchService from '../services/match.service';
import Match from '../database/models/Match';
import validateToken from '../middlewares/validateToken';

const matches = Router();

const matchController = new MatchController(new MatchService(Match));

matches.get('/', (req: Request, res: Response, next: NextFunction) =>
  matchController.getAll(req, res, next));
matches.post('/', validateToken, (req: Request, res: Response, next: NextFunction) =>
  matchController.create(req, res, next));
matches.patch('/:id', (req: Request, res: Response, next: NextFunction) =>
  matchController.upgradeGoals(req, res, next));
matches.patch('/:id/finish', (req: Request, res: Response, next: NextFunction) =>
  matchController.upgrateProgress(req, res, next));

export default matches;
