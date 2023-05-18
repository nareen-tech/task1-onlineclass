import { Response, Request, NextFunction } from 'express';
import { UserService } from '../services/user';
import { comparePassword, createJWT, hashPassword } from '../utility/user';



// Creating new user

const signup= async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, email } = req.body;
    const exist = await UserService.getUserByCondition({email: email}, true);
    if (exist) {
      return res.status(400).json({
        success: false,
        message: 'Such user already exist!',
      });
    }
    const hashedPassword = hashPassword(password);
    await UserService.createNewUser({...req.body, password: hashedPassword });
    res.status(200).json({
      success: true,
      message: 'Signup Successful!!',
    });
  } catch (error) {
    next(error);
  }
};


// user login

const login= async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email } = req.body;
 
      const exist = await UserService.getUserByCondition({email: email}, false);
      if (!exist) {
        return res.status(400).json({
          success: false,
          message: 'No such email exist',
        });
      }
      const verifyUser = comparePassword(req.body.password, exist.password);
      if (!verifyUser) {
        return res.status(400).json({
          success: false,
          message: 'Email or Password incorrect',
        });
      }
      await UserService.updateUserById(exist._id, {status:'ONLINE', verified: true});
      res.status(200).json({
        success: true,
        message: 'User Verified',
        token: createJWT(exist._id),
      });

    } catch (error) {
      next(error);
    }
};



export {
    signup,
    login
}