const rm = require('../../services/require.module');
const userDao = require('../DAO/user');
const { v4: uuidV4 } = require('uuid');


class userService {
  async register(input) {
    try {
      const schema = {
        'name': 'joi.string().required()',
        'userId': 'joi.string().required()',
        'email': 'joi.string().email().required()',
        'password': 'joi.string().required()',
        'userType': `joi.string().valid('admin','user').required()`
      };
      const schemaValidationResult = rm.validationUtility.validate(schema, input);
      if (!schemaValidationResult) {
        let userDetail = [];
        if (input.email) {
          const query = { 'email': input.email };
          userDetail = await userDao.details(query);
        }

        if (userDetail?.error?.message === 'No record found') {
          const result = await userDao.register(input);
          return result;
        } else {
          return { error: { message: 'User already present' }, status: 403 };
        }
      } else {
        return ({
          error: {
            description: 'Request Validation Error',
            error: schemaValidationResult.error.details
          },
          status: 400
        });
      }
    } catch (error) {
      return { error: { message: error.message }, status: 500 };
    }
  }

  async details(input) {
    try {
      const schema = {
        'email': 'joi.string().email().required()'
      }
      const schemaValidationResult = rm.validationUtility.validate(schema, input);
      if (schemaValidationResult) {
        return ({
          error: {
            description: 'Request Validation Error',
            error: schemaValidationResult.error.details
          },
          status: 400
        });
      } else {
        const query = { 'email': input.email };
        const result = await userDao.details(query);
        return result;
      }
    } catch (error) {
      return { error: { message: error.message }, status: 500 };
    }
  }

  async list() {
    try {
        const result = await userDao.list();
        return result;
    } catch (error) {
      return { error: { message: error.message }, status: 500 };
    }
  }

}

module.exports = new userService();
