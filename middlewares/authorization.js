const rm = require('../services/require.module');

exports.validate = async (req, res, next) => {
  if (typeof req.headers.cookie !== 'undefined') {
    const auth = req.headers.cookie.match(/(; )?auth=([^;]*);?/);
    if (typeof auth !== 'undefined' && auth !== null && auth !== '') {
      req.headers.auth = auth[2];
    }
  }

  const errorMsg = {error: {message: 'Invalid Token Id'}, status: 401};
  if (typeof req.headers.authorization !== 'undefined') {
    const jwt = new (rm.jwt)(req);
    const result = await jwt.verifyJwt();
    if (result) {
      next();
    } else {
      rm.responseHandler(req, res, errorMsg);
    }
  } else {
    rm.responseHandler(req, res, errorMsg);
  }
};
