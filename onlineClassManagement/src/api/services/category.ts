import CategoryModel from '../models/category';
const ITEMS = 5;


export const CategoryService = {

  async createNewCategory(payload: object)  {
    try {
      return await CategoryModel.create(payload);
    } catch (error) {
      throw error;
    }
  },
  async updateCategoryById(CategoryId: any, data: object) {
    try {
      return await CategoryModel.updateOne({ _id: CategoryId }, { $set: data });
    } catch (error) {
      throw error;
    }
  },
  async updateCategoryByCondition(condition: any, data: object) {
    try {
      return await CategoryModel.updateOne(condition, { $set: data });
    } catch (error) {
      throw error;
    }
  },
  async getCategoryById(CategoryId: any) {
    try {
      return await CategoryModel.findById({ _id: CategoryId });
    } catch (error) {
      throw error;
    }
  },
  async getCategoryByCondition(Condition: any) {
  try{
      return await CategoryModel.findOne(Condition);
    } catch (error) {
      throw error;
    }
  },
  async getAllCategoryiesNCourses(search: any, page: any) {
    try {
     
      var categoryCondition : any = {};

      if(search) {
        categoryCondition.$or = [
          {title: {$regex: search as string, $options: 'i'}},
          {description: {$regex: search as string, $options: 'i'}},
        ]
      }
      var categoryQuery : any=[
        {
          '$match': categoryCondition,
        },
        {
          $lookup:
            {
              from: 'courses',
              localField: '_id',
              foreignField: 'categoryId',
              as: 'courses',
            },
        },
       { $unwind: { path: "$courses", preserveNullAndEmptyArrays: true } },
        {       
          '$group':
              {
                _id: '$_id',
                title: {$first:'$title'},
                description: {$first:'$description'},
                courses: {
                  '$push': {
                    _id:'$courses._id',
                    title:'$courses.title',
                    duration: '$courses.duration',
                    mode: '$courses.mode',
                    topics: '$courses.topics',
                  },
                },
                createdAt: {$first:'$createdAt'},
                updatedAt: {$first:'$updatedAt'},
              },              
        },
      ]
      const totalRecords = await CategoryModel.aggregate(categoryQuery);
      var paginationQuery : any = [
       { $skip: (page-1) * ITEMS },
       { $limit: ITEMS }
      ]
      const resultantQuery = categoryQuery.concat(paginationQuery);

      const categoryResult = await CategoryModel.aggregate(resultantQuery);
      return {
        total : totalRecords.length,
        totalPages: Math.ceil(totalRecords.length / ITEMS),
        data: categoryResult,
      }
    } catch (error) {
      throw error;
    }
  },

};


