import { Router } from 'express';
import { validateIncomingRequest } from '../../middlewares/validators';
import * as UserHandler from '../handlers/user';
import { body, checkSchema } from 'express-validator';
import { UserLoginSchema, UserSignupSchema, checkEnumTypes } from '../schemaValidators/user';

const router = Router();

router.post('/signup',checkSchema(checkEnumTypes), validateIncomingRequest(UserSignupSchema), UserHandler.signup);
router.post('/login',validateIncomingRequest(UserLoginSchema), UserHandler.login);



export default router;
