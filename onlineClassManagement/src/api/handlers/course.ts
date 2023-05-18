import { Response, Request, NextFunction } from 'express';
import { UserService } from '../services/user';
import UserTokenRequest from '../interfaces/UserTokenRequest';
import { CourseService } from '../services/course';
import { CategoryService } from '../services/category';
import { UserDetailService } from '../services/userDetails';
const ObjectId = require('mongoose').Types.ObjectId;



// creating new course with category id

const createNewCourse= async (
  req: UserTokenRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.userDetails;

    const { categoryId, title, professorId } = req.body;
    

    const exist = await CategoryService.getCategoryById(categoryId);
    if (!exist) {
      return res.status(400).json({
        success: false,
        message: 'No such category found',
      });
    }

    const existUser = await UserService.getUserById(professorId);
    if (existUser.role !== 'PROFESSOR') {
      return res.status(400).json({
        success: false,
        message: 'No such professor found!',
      });
    }

    const existCourse = await CourseService.getCourseByCondition({title: title});
    if (existCourse) {
      return res.status(400).json({
        success: false,
        message: 'Such course already exist!',
      });
    }

    await CourseService.createNewCourse({...req.body, addedBy :user?._id});
    res.status(200).json({
      success: true,
      message: 'Course added Successfully!!',
    });
  } catch (error) {
    next(error);
  }
};


// updating course
const updateCourse= async (
    req: UserTokenRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = req.userDetails;
  
      const { id } = req.body;
  
      const exist = await CourseService.getCourseById(id);
      if (!exist) {
        return res.status(400).json({
          success: false,
          message: 'No such Course found!',
        });
      }
      await CourseService.updateCourseById(exist._id,req.body);
      res.status(200).json({
        success: true,
        message: 'Course updated Successfully!!',
      });
    } catch (error) {
      next(error);
    }
};


// fetch course by id % thier respective users, professors
const getCourseById= async (
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
          message: 'Please provide course id',
        });
      }
  
      const exist = await CourseService.getCourseById(id);
      if (!exist) {
        return res.status(400).json({
          success: false,
          message: 'No such Course found!',
        });
      }

      const result = await CourseService.getCouseWithUserDetails(id);

      res.status(200).json({
        success: true,
        message: 'Course fetched Successfully!!',
        data : result
      });
    } catch (error) {
      next(error);
    }
};

// fetch all courses
const getAllCourses= async (
  req: UserTokenRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.userDetails;

    const result = await CourseService.getAllCourses();

    res.status(200).json({
      success: true,
      message: 'Course fetched Successfully!!',
      data : result
    });
  } catch (error) {
    next(error);
  }
};

// deletig course by id
const deleteCourseById= async (
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
          message: 'Please provide course id',
        });
      }

      const existCourse = await CourseService.getCourseById(id);
      if (!existCourse) {
        return res.status(400).json({
          success: false,
          message: 'No such Course found!',
        });
      }
  
      const exist = await UserDetailService.getUserDetailByCondition({courseId: id});
      if (exist) {
        return res.status(400).json({
          success: false,
          message: 'Canot delete, as this resource is already taken!',
        });
      }
      await CourseService.deleteCourseById({_id:id});

      res.status(200).json({
        success: true,
        message: 'Course deleted Successfully!!',
      });
    } catch (error) {
      next(error);
    }
};

export {
    createNewCourse,
    updateCourse,
    getAllCourses,
    getCourseById,
    deleteCourseById

}