import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';

export default class userController {
  constructor(private userService: UserService) {}

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const token = await this.userService.login({ email, password });
      return res.json({ token });
    } catch (error) {
      return next(error);
    }
  }

  static async getRole(role: string, req: Request, res: Response, next: NextFunction) {
    try {
      return res.json({ role });
    } catch (error) {
      return next(error);
    }
  }
}
