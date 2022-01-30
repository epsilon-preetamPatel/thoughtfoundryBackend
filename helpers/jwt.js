const rm = require('../services/require.module');
const jsonwebtoken = require('jsonwebtoken');

class Jwt {
  constructor(request) {
    this.request = request;
    this.secret = (rm.settings.jwt && rm.settings.jwt.secretKey) ? rm.settings.jwt.secretKey : null;
  }

  async verifyJwt() {
    try {
      let token = null;
      if (this.request.headers && this.request.headers.authorization && this.request.headers.authorization.includes('Bearer ')) {
        token = this.request.headers.authorization.split(' ')[1];
      }
      const decoded = await jsonwebtoken.verify(token, this.secret);
      if (!rm.lodash.isEmpty(decoded)) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

module.exports = Jwt;
