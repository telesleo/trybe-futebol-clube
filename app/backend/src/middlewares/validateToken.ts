import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import AppError, { statusCode } from '../utils/error';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization as string;

    const { JWT_SECRET } = process.env;

    const { role } = verify(token, JWT_SECRET as string) as JwtPayload;

    res.json({ role });

    next();
  } catch (error) {
    throw new AppError(statusCode.UNAUTHORIZED, 'Invalid token');
  }
};

export default validateLogin;
