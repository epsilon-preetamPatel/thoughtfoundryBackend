const rm = require('../services/require.module');
module.exports = ((req, res, next) => {
  try {
    const param = {url: req.path, method: req.method, body: req.body};
    const requestHandler = new rm.routeHandler({request: req}).parse(param);
    if (requestHandler.status === 404) {
      throw requestHandler;
    }
    const output = requestHandler.handle();
    output.then((response) => {
      rm.responseHandler(req, res, response);
    }).catch((error) => {
      rm.responseHandler(req, res, error);
    });
  } catch (error) {
    rm.responseHandler(req, res, error);
  }
});
