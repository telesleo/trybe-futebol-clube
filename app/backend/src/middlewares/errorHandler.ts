import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/error';

export default (error: AppError, req: Request, res: Response, _next: NextFunction) => {
  const { code, message } = error;
  if (!code) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
  res.status(code).json({ message });
};
