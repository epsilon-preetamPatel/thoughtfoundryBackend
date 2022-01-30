'use strict';
class Singleton {
  get requesthandler() {
    return require('../hooks/request.handler');
  }
  get responseHandler() {
    return require('../hooks/response.handler');
  }

  get routeHandler() {
    return require('../services/route.handler');
  }

  get mongoose() {
    return require('mongoose');
  }

  get validationUtility() {
    return require('../helpers/validation.utility');
  }

  get jwt() {
    return require('../helpers/jwt');
  }

  get lodash() {
    return require('lodash');
  };

  get settings() {
    return require('../configs/setting.json');
  }

  get joi() {
    return require('joi');
  }

  get inflect() {
    return require('inflect');
  }

  get fs(){
    return require('fs');
  }
}

const singletonobj = new Singleton();

module.exports = singletonobj;
