import { Router, Request, Response, NextFunction } from 'express';
import MatchController from '../controllers/match.controller';
import MatchService from '../services/match.service';
import Match from '../database/models/Match';

const matches = Router();

const matchController = new MatchController(new MatchService(Match));

matches.get('/', (req: Request, res: Response, next: NextFunction) =>
  matchController.getAll(req, res, next));
matches.post('/', (req: Request, res: Response, next: NextFunction) =>
  matchController.create(req, res, next));

export default matches;
