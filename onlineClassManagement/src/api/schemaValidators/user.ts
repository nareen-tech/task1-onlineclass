import { body, param, query } from "express-validator";

const UserSignupSchema = [
    body('firstName').notEmpty(),
    body('lastName').notEmpty(),
    body('gender').notEmpty(),
    body('email').notEmpty(),
    body('password').notEmpty(), 
 ];
  
  const UserLoginSchema = [
    body('email').notEmpty(),
    body('password').notEmpty(), 
  ];
  
  var checkEnumTypes: any = {
    'gender': {
      in: 'body',
      isIn: {
        options: [['FEMALE', 'MALE']],
        errorMessage: 'gender can only be  FEMALE , MALE',
      },
    },
  };

  const CourseJoinSchema = [
    param('id').optional(),

  ];

  const userGetCategorySchema = [
    query('page').notEmpty(), 
];
  

  export {
    UserSignupSchema,
    UserLoginSchema,
    checkEnumTypes,
    CourseJoinSchema,
    userGetCategorySchema
  }