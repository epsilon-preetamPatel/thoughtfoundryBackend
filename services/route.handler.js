'use strict';

const rm = require('../services/require.module');

class routeHandler {
  constructor(options = {}) {
    this.request = options.request;
  }

  parse(route) {
    try {
      const parsedUrl = route.url.split('/');
      const controller = parsedUrl[1];
      const method = parsedUrl[2] || route.method.toLowerCase();
      const ControllerHandler = require('../main/controllers/' + controller);
      const routeAction = ControllerHandler[method];
      const options = {request: this.request};
      if (routeAction) {
        options.status = true;
        options.controller = ControllerHandler;
        options.method = method;
        const requestHandler = new (rm.requesthandler)(options);
        return requestHandler;
      } else {
        const errorMsg = {error: {message: 'URL NOT FOUND'}, status: 404};
        throw errorMsg;
      }
    } catch (error) {
      return error;
    }
  }
}
module.exports = routeHandler;
