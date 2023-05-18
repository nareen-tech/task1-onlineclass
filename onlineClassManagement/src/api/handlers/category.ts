import { Response, Request, NextFunction } from 'express';
import { UserService } from '../services/user';
import UserTokenRequest from '../interfaces/UserTokenRequest';
import { CategoryService } from '../services/category';





// creating new category

const createNewCategory= async (
  req: UserTokenRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.userDetails;

    const { title } = req.body;

    const exist = await CategoryService.getCategoryByCondition({title: title});
    if (exist) {
      return res.status(400).json({
        success: false,
        message: 'Such category title already exixts!',
      });
    }
    await CategoryService.createNewCategory(req.body);
    res.status(200).json({
      success: true,
      message: 'Category added Successfully!!',
    });
  } catch (error) {
    next(error);
  }
};

// updating category
const updateCategory= async (
    req: UserTokenRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = req.userDetails;
  
      const { id } = req.body;
  
      const exist = await CategoryService.getCategoryById(id);
      if (!exist) {
        return res.status(400).json({
          success: false,
          message: 'No such category found!',
        });
      }
      await CategoryService.updateCategoryById(exist._id,req.body);
      res.status(200).json({
        success: true,
        message: 'Category updated Successfully!!',
      });
    } catch (error) {
      next(error);
    }
};

// fetch all ccategories & thier respective course
const getAllCategories= async (
    req: UserTokenRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = req.userDetails;
      const { search, page } = req.query;
  
      const categories = await CategoryService.getAllCategoryiesNCourses(search, Number(page) );
      res.status(200).json({
        success: true,
        totalRecords: categories.total,
        totalPages: categories.totalPages,
        data: categories.data
      });
    } catch (error) {
      next(error);
    }
};

export {
    createNewCategory,
    updateCategory,
    getAllCategories,
}