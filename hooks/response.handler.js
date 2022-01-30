module.exports = (req, res, result) => {
  try {
    if (result.data) {
      res.status(200).send(result);
    } else {
      if (!result.status) {
        result.status = 500;
      }
      res.status(result.status).send(result);
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
};
