import UserDetailModel from '../models/userDetails';



export const UserDetailService = {

  async createNewUserDetail(payload: object)  {
    try {
      return await UserDetailModel.create(payload);
    } catch (error) {
      throw error;
    }
  },
  async updateUserDetailById(UserDetailId: any, data: object) {
    try {
      return await UserDetailModel.updateOne({ _id: UserDetailId }, { $set: data });
    } catch (error) {
      throw error;
    }
  },
  async updateUserDetailByCondition(condition: any, data: object) {
    try {
      return await UserDetailModel.updateOne(condition, { $set: data });
    } catch (error) {
      throw error;
    }
  },
  async getUserDetailById(UserDetailId: any) {
    try {
      return await UserDetailModel.findById({ _id: UserDetailId });
    } catch (error) {
      throw error;
    }
  },
  async getUserDetailByCondition(Condition: any) {
  try{
      return await UserDetailModel.findOne(Condition);
    } catch (error) {
      throw error;
    }
  },

 
};


