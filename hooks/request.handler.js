class RequestHandler {
  constructor(options) {
    this.options = options;
  }
  handle() {
    return new Promise((resolve, reject) => {
      this.options.controller[this.options.method](this.options.request, (error, result) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(result);
        }
      });
    });
  }
}

module.exports = RequestHandler;
