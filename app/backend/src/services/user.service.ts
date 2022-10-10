import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import AppError, { statusCode } from '../utils/error';
import ILogin from '../interfaces/ILogin';
import User from '../database/models/User';

dotenv.config();

export default class UserService {
  constructor(private userModel: typeof User) { }

  async login(login: ILogin): Promise<string> {
    const user = await this.userModel.findOne(
      { where: { email: login.email } },
    ) as ILogin;

    if (!user || !compareSync(login.password, user.password)) {
      throw new AppError(statusCode.BAD_REQUEST, 'Incorrect email or password');
    }

    const { JWT_SECRET } = process.env;

    const token = sign({ id: user.id }, JWT_SECRET as string, { expiresIn: '7d' });

    return token;
  }
}
