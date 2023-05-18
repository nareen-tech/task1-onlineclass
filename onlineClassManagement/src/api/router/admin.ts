import { Router, query } from 'express';
import * as AdminHandler from '../handlers/admin';
import { body, checkSchema } from 'express-validator';
import { UserLoginSchema, UserSignupSchema, checkEnumTypes } from '../schemaValidators/user';
import { userAuth } from '../../middlewares/userAuth';
import { verifyUserRole } from '../../middlewares/verifyUserRole';
import { validateIncomingRequest } from '../../middlewares/validators';
import { adminUpdateSchema, adminUserFilterSchema } from '../schemaValidators/admin';

const router = Router();
const adminMiddlewares = [userAuth, verifyUserRole('ADMIN')]




router.post('/update-role',adminMiddlewares, validateIncomingRequest(adminUpdateSchema) ,AdminHandler.updateUserRole);

router.get('/users-filters',adminMiddlewares, validateIncomingRequest(adminUserFilterSchema), AdminHandler.getUsersByFilters);

router.get('/list/:id',adminMiddlewares, AdminHandler.getUserById);




export default router;
