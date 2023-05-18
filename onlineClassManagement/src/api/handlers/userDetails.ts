import { Response, Request, NextFunction } from 'express';
import UserTokenRequest from '../interfaces/UserTokenRequest';
import { CourseService } from '../services/course';
import { UserDetailService } from '../services/userDetails';


// join new course

const joinNewCourse= async (
  req: UserTokenRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.userDetails;

    const { id } = req.params;
    

    const exist = await CourseService.getCourseById(id);
    if (!exist) {
      return res.status(400).json({
        success: false,
        message: 'No such course found',
      });
    }


    const existUser = await UserDetailService.getUserDetailByCondition({_id: user?._id, courseId : id});
    if (existUser) {
      return res.status(400).json({
        success: false,
        message: 'You have already taken this course!',
      });
    }

    await UserDetailService.createNewUserDetail({courseId : id, userId :user?._id, joinedOn : new Date()});
    res.status(200).json({
      success: true,
      message: 'Success!',
    });
  } catch (error) {
    next(error);
  }
};



export {
    joinNewCourse

}