import { Router, query } from 'express';
import * as CategoryHandler from '../handlers/category';
import { body, checkSchema } from 'express-validator';
import { userGetCategorySchema } from '../schemaValidators/user';
import { userAuth } from '../../middlewares/userAuth';
import { verifyUserRole } from '../../middlewares/verifyUserRole';
import { validateIncomingRequest } from '../../middlewares/validators';
import { adminCreateCategorySchema, adminUpdateCategorySchema } from '../schemaValidators/admin';

const router = Router();
const adminMiddlewares = [userAuth, verifyUserRole('ADMIN')]




router.post('/create',adminMiddlewares, validateIncomingRequest(adminCreateCategorySchema) ,CategoryHandler.createNewCategory);
router.post('/update',adminMiddlewares, validateIncomingRequest(adminUpdateCategorySchema) ,CategoryHandler.updateCategory);
router.get('/list',userAuth,validateIncomingRequest(userGetCategorySchema),CategoryHandler.getAllCategories);





export default router;
