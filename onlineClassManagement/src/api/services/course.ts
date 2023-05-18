import CourseModel from '../models/course';
const ObjectId = require('mongoose').Types.ObjectId;



export const CourseService = {

  async createNewCourse(payload: object)  {
    try {
      return await CourseModel.create(payload);
    } catch (error) {
      throw error;
    }
  },
  async updateCourseById(CourseId: any, data: object) {
    try {
      return await CourseModel.updateOne({ _id: CourseId }, { $set: data });
    } catch (error) {
      throw error;
    }
  },
  async updateCourseByCondition(condition: any, data: object) {
    try {
      return await CourseModel.updateOne(condition, { $set: data });
    } catch (error) {
      throw error;
    }
  },
  async getCourseById(CourseId: any) {
    try {
      return await CourseModel.findById({ _id: CourseId });
    } catch (error) {
      throw error;
    }
  },
  async getCourseByCondition(Condition: any) {
  try{
      return await CourseModel.findOne(Condition);
    } catch (error) {
      throw error;
    }
  },
  async getAllCourses() {
    try {
      return await CourseModel.find();
    } catch (error) {
      throw error;
    }
  },
  async deleteCourseById(Condition: any) {
    try{
        return await CourseModel.deleteOne(Condition);
      } catch (error) {
        throw error;
      }
    },
  async getCouseWithUserDetails(CourseId: any) {
    try {
      return await CourseModel.aggregate([
        {
          '$match': { _id: new ObjectId(CourseId) },
        },
        {
          $lookup:
            {
              from: 'userdetails',
              localField: '_id',
              foreignField: 'courseId',
              as: 'userdetails',
            },
        },
        {       
          '$project':
                {
                    _id:1,
                    title: 1,
                    categoryId: 1,
                    professorId: 1,
                    duration: 1,
                    mode: 1,
                    userId : { $arrayElemAt: [ '$userdetails.userId', 0 ] },
                },
          },
        {
          $lookup:
            {
              from: 'users',
              localField: 'userId',
              foreignField: '_id',
              as: 'users',
            },
        },
        { $unwind: { path: "$users", preserveNullAndEmptyArrays: true } },
        {       
          '$group':
              {
                _id: '$_id',
                title: {$first:'$title'},
                categoryId: {$first:'$categoryId'},
                professorId: {$first:'$professorId'},
                duration: {$first:'$duration'},
                mode: {$first:'$mode'},
                users: {
                  '$push': {
                    _id:'$users._id',
                    firstName:'$users.firstName',
                    lastName: '$users.lastName',
                    email: '$users.email',
                    phone: '$users.phone',
                  },
                },
                createdAt: {$first:'$createdAt'},
                updatedAt: {$first:'$updatedAt'},
              },              
        },
        {
            $lookup:
              {
                from: 'users',
                localField: 'professorId',
                foreignField: '_id',
                as: 'professors',
              },
        },
        {       
            '$project':
                {
                    _id:1,
                    title: 1,
                    categoryId: 1,
                    professorId: 1,
                    duration: 1,
                    mode: 1,
                    users: 1,
                    'professors.firstName': 1,
                    'professors.lastName': 1,
                    'professors.email': 1,
                    'professors.gender': 1,
                    'professors.phone': 1,
                },
        },

      ]);
    } catch (error) {
      throw error;
    }
  },
 
};


