import { Router, query } from 'express';
import * as CourseHandler from '../handlers/course';
import { userAuth } from '../../middlewares/userAuth';
import { verifyUserRole } from '../../middlewares/verifyUserRole';
import { validateIncomingRequest } from '../../middlewares/validators';
import { adminCreateCourseSchema, adminDeleteCourseByIdSchema, userGetCourseByIdSchema, adminUpdateCourseSchema } from '../schemaValidators/admin';


const router = Router();
const adminMiddlewares = [userAuth, verifyUserRole('ADMIN')]




router.post('/create',adminMiddlewares, validateIncomingRequest(adminCreateCourseSchema) ,CourseHandler.createNewCourse);
router.post('/update',adminMiddlewares, validateIncomingRequest(adminUpdateCourseSchema) ,CourseHandler.updateCourse);
router.get('/list', userAuth, CourseHandler.getAllCourses);
router.get('/list/:id', userAuth, validateIncomingRequest(userGetCourseByIdSchema) ,CourseHandler.getCourseById);
router.delete('/delete/:id',adminMiddlewares, validateIncomingRequest(adminDeleteCourseByIdSchema) , CourseHandler.deleteCourseById);



export default router;
