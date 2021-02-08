module.exports = (app) => {
  return (req, res, next) => {
    const { user } = app.services;
    const { authorization } = req.headers;

    if (!authorization) return unauthorized();
    return app.helpers.user.verifyToken(authorization, { ignoreExpiration: true })
      .then((decryptedToken) => {
        const { id } = decryptedToken.data;
        return user.findUser({ where: { id, enable: true } });
      })
      .then(app.helpers.ensureOne)
      .then((user) => {
        req.user = {
          id: user.id
        };
      })
      .then(next)
      .catch(unauthorized);

    function unauthorized(error) {
      if (!error) {
        res.error({});
      } else {
        let err = null;
        switch (error.name) {
          case 'TokenExpiredError':
            err = {};
            break;
          default:
            err = {};
            break;
        }
        res.error(err);
      }
    }
  };
};
