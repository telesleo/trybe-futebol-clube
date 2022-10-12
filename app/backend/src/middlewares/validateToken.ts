import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { statusCode } from '../utils/error';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization as string;

    const { JWT_SECRET } = process.env;

    verify(token, JWT_SECRET as string) as JwtPayload;

    next();
  } catch (error) {
    return res.status(statusCode.UNAUTHORIZED).json({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
