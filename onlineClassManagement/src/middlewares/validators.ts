import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

import ErrorResponse from '../api/interfaces/ErrorHandler';


export const validateIncomingRequest = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result:any = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const errorObject: any = errors.array()[0];
    res.status(400).json({ 
      success: false,
      error: 'Missing field' + ' ' + errorObject.path,
      message: errorObject.msg,
      path: errorObject.location,
    });
  };
};

export function apiNotFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`Api Not Found - ${req.originalUrl}`);
  next(error);
}


export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
}

