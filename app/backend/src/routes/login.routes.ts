import { Router, Request, Response, NextFunction } from 'express';
import User from '../database/models/User';
import UserController from '../controllers/user.controller';
import UserService from '../services/user.service';
import validateToken from '../middlewares/validateToken';

const login = Router();

const userController = new UserController(new UserService(User));

login.get('/validate', validateToken);
login.post('/', (req: Request, res: Response, next: NextFunction) =>
  userController.login(req, res, next));

export default login;
