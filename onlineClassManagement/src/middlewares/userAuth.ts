import jwt, { JwtPayload } from 'jsonwebtoken';
import moment from 'moment';
import { NextFunction, Response, Request } from 'express';
import UserTokenRequest from '../api/interfaces/UserTokenRequest';
import { UserService } from '../api/services/user';

export const userAuth = async (
  req: UserTokenRequest,
  res: Response,
  next: NextFunction,
) => {
  const bearerHeader = req.headers.authorization;
  try {
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      const tokenInfo = jwt.verify(
        bearerToken,
        process.env.JWTSECRET!,
      ) as JwtPayload;
      if (tokenInfo.exp! < moment().unix()) {
        await UserService.updateUserById(tokenInfo.id, {status: 'OFFLINE'});
        return res.status(403).json({
          success: false,
          message: 'Token is expired!',
        });
      }
      const userDetails = await UserService.getUserById(tokenInfo.id);
      if (!userDetails) {
        return res.status(403).json({
          success: false,
          message: 'Invalid token',
        });
      }
      req.userDetails = userDetails;

      next();
    } else {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized User',
      });
    }
  } catch (err) {
    return res.status(500).json({  
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};