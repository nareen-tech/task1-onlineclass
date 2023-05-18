import UserTokenRequest from '../api/interfaces/UserTokenRequest';
import { NextFunction, Response } from 'express';

export const verifyUserRole = (role: string) => {
  return (req: UserTokenRequest, res: Response, next: NextFunction) => {
    const user = req.userDetails;
    if (role.includes(user?.role ?? '')) {
      next();
    } else {
      res.status(405).json({ message: `Access denied!` });
    }
  };
};