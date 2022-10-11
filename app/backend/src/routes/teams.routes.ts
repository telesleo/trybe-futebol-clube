import { Router, Request, Response, NextFunction } from 'express';
import TeamController from '../controllers/team.controller';
import TeamService from '../services/team.service';
import Team from '../database/models/Team';

const teams = Router();

const teamController = new TeamController(new TeamService(Team));

teams.get('/', (req: Request, res: Response, next: NextFunction) =>
  teamController.getAll(req, res, next));

export default teams;
