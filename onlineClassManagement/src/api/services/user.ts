import UserModel from '../models/user';
const ObjectId = require('mongoose').Types.ObjectId;
const ITEMS = 5;



export const UserService = {

  async createNewUser(payload: object)  {
    try {
      return await UserModel.create(payload);
    } catch (error) {
      throw error;
    }
  },
  async updateUserById(UserId: any, data: object) {
    try {
      return await UserModel.updateOne({ _id: UserId }, { $set: data });
    } catch (error) {
      throw error;
    }
  },
  async getUserById(UserId: any) {
    try {
      return await UserModel.findById({ _id: UserId });
    } catch (error) {
      throw error;
    }
  },
  async getUserByCondition(Condition: any, hideFields: Boolean) {
    try {
        if(hideFields) {
            return await UserModel.findOne(Condition,{password: 0});
        }
        return await UserModel.findOne(Condition);
    } catch (error) {
      throw error;
    }
  },
  async getAllUsers() {
    try {
      return await UserModel.find();
    } catch (error) {
      throw error;
    }
  },
  async getAllUsersByFilters(searchObject: any, page: any) {
    try {
     
      var userCondition : any = {};

      if(searchObject.search) {
        userCondition.$or = [
          {firstName: {$regex: searchObject.search as string, $options: 'i'}},
          {lastName: {$regex: searchObject.search as string, $options: 'i'}},
          {email: {$regex: searchObject.search as string, $options: 'i'}},
        ]
      }

      if(searchObject.role) {
        const roles = searchObject.role.toUpperCase()
        userCondition.$or = [
          {role: roles},
        ]
      }

      if(searchObject.status) {
        const status = searchObject.status.toUpperCase()
        userCondition.$or = [
          {status: status},
        ]
      }
      if(searchObject.isVerified) {
        userCondition.$or = [
          {isVerified: searchObject.isVerified},
        ]
      }

      var userQuery: any =[
        {
          '$match': userCondition,
        },
        {
          '$project':
                {
                  _id:1,
                  firstName: 1,
                  lastName: 1,
                  email: 1,
                  phone: 1,
                  status: 1,
                  graduation: 1,
                  isVerified: 1,
                  role: 1,
                  createdAt: 1,
                  updatedAt: 1,

                },
        },
        {$sort : {_id:-1 }},
      ];
      const totalRecords = await UserModel.aggregate(userQuery);

      var paginationQuery : any = [
       { $skip: (page-1) * ITEMS },
       { $limit: ITEMS }
      ]
      const resultantQuery = userQuery.concat(paginationQuery);

      const userResult = await UserModel.aggregate(resultantQuery);
      return {
        total : totalRecords.length,
        totalPages: Math.ceil(totalRecords.length / ITEMS),
        data: userResult,
      }
    } catch (error) {
      throw error;
    }
  },
  async getUserDetailsById(userId: any) {
    try {
      return await UserModel.aggregate([
        {
          '$match': { _id: new ObjectId(userId) },
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
                  firstName: 1,
                  lastName: 1,
                  email: 1,
                  phone: 1,
                  status: 1,
                  graduation: 1,
                  isVerified: 1,
                  role: 1,
                  createdAt: 1,
                  updatedAt: 1,
                  courseId : { $arrayElemAt: [ '$userdetails.courseId', 0 ] },
                },
          },
        {
          $lookup:
            {
              from: 'courses',
              localField: 'courseId',
              foreignField: '_id',
              as: 'courses',
            },
        },
        {       
          '$project':
                {
                  _id:1,
                  firstName: 1,
                  lastName: 1,
                  email: 1,
                  phone: 1,
                  status: 1,
                  graduation: 1,
                  isVerified: 1,
                  role: 1,
                  createdAt: 1,
                  updatedAt: 1,
                 'courses.title': 1,
                 'courses.mode': 1,
                 'courses.topics': 1,
                 'courses.duration': 1,

                },
          },

      ]);
    } catch (error) {
      throw error;
    }
  },
  
};


