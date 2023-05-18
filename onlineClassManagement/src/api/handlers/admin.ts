import { Response, Request, NextFunction } from 'express';
import { UserService } from '../services/user';
import UserTokenRequest from '../interfaces/UserTokenRequest';



// updating user role to professor

const updateUserRole= async (
  req: UserTokenRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.userDetails
    const { id } = req.body;

    if((user._id).toString() === id) {
    return res.status(400).json({
        success: false,
        message: 'Cannot update self role',
        });
    }
    const exist = await UserService.getUserByCondition({_id:id, verified: true }, true);
    if (!exist) {
      return res.status(400).json({
        success: false,
        message: 'No such user found',
      });
    }
    await UserService.updateUserById(id, {role: 'PROFESSOR'});
    res.status(200).json({
      success: true,
      message: 'Update Successful!!',
    });
  } catch (error) {
    next(error);
  }
};

// fetching users details based on filters

const getUsersByFilters= async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { search, page, status, role, isVerified } = req.query;

      const users = await UserService.getAllUsersByFilters({search, status, role, isVerified}, Number(page));
      res.status(200).json({
        success: true,
        totalRecords: users.total,
        totalPages: users.totalPages,
        data: users.data
      });
    } catch (error) {
      next(error);
    }
};

// get users by id
const getUserById= async (
  req: UserTokenRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.userDetails;

    const { id } = req.params;

    if(!id) {
      return res.status(400).json({
        success: false,
        message: 'Please provide user id',
      });
    }

    const exist = await UserService.getUserById(id);
    if (!exist) {
      return res.status(400).json({
        success: false,
        message: 'No such User found!',
      });
    }

    const result = await UserService.getUserDetailsById(id);

    res.status(200).json({
      success: true,
      message: 'User fetched Successfully!!',
      data : result
    });
  } catch (error) {
    next(error);
  }
};

export {
    updateUserRole,
    getUsersByFilters,
    getUserById
}