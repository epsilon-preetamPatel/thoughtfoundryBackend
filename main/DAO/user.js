const userModel = require('../model/userModel');

class userDao {
  async register(data) {
    try {
      const newUser = new userModel(data);
      const savedUser = await newUser.save();
      return {
        data: {
          message: 'Account register successfully',
          result: savedUser
        }
      };
    } catch (error) {
      return { error: { message: error.message }, status: 500 };
    }
  }

  async details(query) {
    try {
      let data = await userModel.find(query)
        .select({ '__v': 0, 'password': 0, '_id': 0 }).lean();
      if (data[0]) {
        return { 'data': data[0] };
      } else {
        return { data: null, error: { message: 'No record found' }, status: 404 };
      }
    } catch (error) {
      return { error: { message: error.message }, status: 500 };
    }
  }

  async list(query) {
    try {
      let data = await userModel.find()
        .select({ '__v': 0, 'password': 0, '_id': 0 }).lean();
      if (data.length > 0) {
        return { 'data': data };
      } else {
        return { error: { message: 'No record found' }, status: 404 };
      }
    } catch (error) {
      return { error: { message: error.message }, status: 500 };
    }
  }
}

module.exports = new userDao();
