import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { statusCode } from '../utils/error';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization as string;

    const { JWT_SECRET } = process.env;

    const { role } = verify(token, JWT_SECRET as string) as JwtPayload;

    next(role);
  } catch (error) {
    return res.status(statusCode.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};

export default validateToken;
