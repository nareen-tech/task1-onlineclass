import { body, param, query } from "express-validator";

const adminUpdateSchema = [
    body('id').notEmpty(), 
];

const adminUserFilterSchema = [
    query('page').notEmpty(), 
];

const adminCreateCategorySchema = [
    body('title').notEmpty(), 
    body('description').notEmpty(), 
];

const adminUpdateCategorySchema = [
    body('id').notEmpty(), 
];

const adminGetCategoryByIdSchema = [
    param('id').notEmpty(), 
];

const adminCreateCourseSchema = [
    body('categoryId').notEmpty(), 
    body('professorId').notEmpty(), 
    body('title').notEmpty(), 
    body('duration').notEmpty(), 
];

const adminUpdateCourseSchema = [
    body('id').notEmpty(), 
];

const userGetCourseByIdSchema = [
    param('id').notEmpty(), 
];

const adminDeleteCourseByIdSchema = [
    param('id').notEmpty(), 
];

 export {
    adminUpdateSchema,
    adminCreateCategorySchema,
    adminUpdateCategorySchema,
    adminGetCategoryByIdSchema,
    adminCreateCourseSchema,
    adminUpdateCourseSchema,
    userGetCourseByIdSchema,
    adminDeleteCourseByIdSchema,
    adminUserFilterSchema
 }
