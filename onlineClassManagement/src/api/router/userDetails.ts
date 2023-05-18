import { Router, query } from 'express';
import * as UserDetailHandler from '../handlers/userDetails';
import { CourseJoinSchema } from '../schemaValidators/user';
import { userAuth } from '../../middlewares/userAuth';
import { validateIncomingRequest } from '../../middlewares/validators';


const router = Router();




router.get('/join-course/:id', userAuth, validateIncomingRequest(CourseJoinSchema) ,UserDetailHandler.joinNewCourse);




export default router;
