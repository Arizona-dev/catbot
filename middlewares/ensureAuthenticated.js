module.exports = (app) => {
  // const { user } = app.services;

  return (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return unauthorized();

    return app.helpers.user.verifyToken(authorization)
      .then(decryptedToken => user.findUserWithAssociation(decryptedToken.data.id))
      .then(app.helpers.ensureOne)
      .then((user) => {
        if (!user.Profile) {
          app.helpers.reject({
            code: 401,
            type: 'err298',
            fields: null,
            data: null,
            message: 'userHasNoProfile',
            error: new Error('userHasNoProfile'),
            display: 'error.userHasNoProfile',
          });
        } else {
          req.user = {
            id: user.id,
            profile: user.Profile.dataValues,
            adherent: user.Adherent,
            groupAdherent: user.GroupAdherent
          };
        }
        return req.user;
      })
      .then(permissions)
      .then((errObj) => {
        if (errObj.isError) {
          return app.helpers.reject({
            code: 403,
            type: 'err001',
            name: 'badRequest',
            message: `unauthorized method: ${errObj.method} for entity ${errObj.entity}`,
            display: 'error.unauthorized',
          });
        }
        return { succes: true };
      })
      .then(() => next())
      .catch(unauthorized);

    function unauthorized(error) {
      if (!error) {
        res.error({
          code: 400,
          type: 'err298',
          name: 'badRequest',
          model: 'User',
          message: 'NoTokenSent',
          error: new Error('NoTokenSent'),
          display: 'error.NoTokenSent',
        });
      } else {
        let err = null;
        switch (error.name) {
          case 'TokenExpiredError':
            err = {
              code: 401,
              type: 'err297',
              name: 'Unauthorized',
              model: 'User',
              message: 'TokenSessionExpired',
              error: new Error('TokenSessionExpired'),
              display: 'error.tokenSessionExpired',
            };
            break;
          case 'AccessError':
            err = {
              code: 403,
              type: 'err001',
              name: 'badRequest',
              message: `unauthorized method: ${error.method}`,
              display: 'error.unauthorized',
            };
            break;
          default:
            err = error;
            break;
        }
        res.error(err);
      }
    }

    async function permissions(user) {
      // Request URL
      const urlCore = req.baseUrl.replace('/', '');
      const urlId = (req.params && req.params.id) ? Number(req.params.id) : null;
      // Add The user Menu Urls names and access to menu
      const menu = user.profile.Profile_Menu.map(profile => ({ ...profile.dataValues, url_name: profile.dataValues.Menu.dataValues.url_name }));
      // Find url that match watched urls
      const find = menu.find(element => element.url_name === urlCore);

      // Basic error object
      const errObj = {
        name: 'AccessError',
        isError: false,
        entity: urlCore
      };

      // Create a list
      const adherentList = user.adherent;
      const groupAdherentList = user.groupAdherent;

      // Assign the id's to a new array
      const adherentData = adherentList.map(adherent => (adherent.dataValues.id));
      const groupAdherentData = groupAdherentList.map(group => (group.dataValues.id));

      // Handle special case
      const whiteList = [ '/users/me' ];
      if (whiteList.includes(req.originalUrl)) {
        return errObj;
      }

      if (find !== undefined) {
        if (find.url_name === 'adherent' || find.url_name === 'groupAdherent') {
          // Find matching 'id', returns (id | undefinded)
          const found = (find.url_name === 'adherent') ? adherentData.find(adherent => adherent === urlId) : groupAdherentData.find(group => group === urlId);
          if (found === undefined) {
            errObj.isError = true;
            return errObj;
          }
        }
        switch (req.method) {
          case 'GET':
            if (find.edit_access || find.view_access) {
              break;
            }
            console.log('ERROR SENT');
            errObj.method = 'GET';
            errObj.isError = true;
            break;
          case 'PUT':
            if (find.edit_access) {
              break;
            }
            console.log('ERROR SENT');
            errObj.isError = true;
            break;
          case 'POST':
            if (find.edit_access) {
              break;
            }
            console.log('ERROR SENT');
            errObj.isError = true;
            break;
          case 'PATCH':
            if (find.edit_access) {
              break;
            }
            console.log('ERROR SENT');
            errObj.isError = true;
            break;
          default:
            break;
        }
      }
      return errObj;
    }
  };
};
