module.exports = (app) => {
  const bcrypt = require('bcrypt');
  const salt = app.config.auth.users.saltRounds;
  return {
    findById,
    findByEmail,
    insertUser,
    updateUserService
  };

  // Find User by email
  function findByEmail(email) {
    return User.findOne(
      { email },
      { password: 0 }
      ).exec()
      .then((result) => {
      // Returns null is no match found
      // Returns the document if found
      return result;
    }).catch((error) => {
      return app.helpers.reject({
        code: "500",
        type: "s001",
        message: "Couldn't check if Email is registered",
        display: "error.findByEmail",
        error
      });
    });
  }

  // Find User by _id
  function findById(id) {
    return User.findById(id).exec()
    .then(app.helpers.ensureOne)
    .catch((error) => {
      return app.helpers.reject({
        code: 401,
        type: 's002',
        fields: [],
        message: 'userNotFound',
        display: 'error.userNotFound',
        error
      });
    });
  }

  // Insert the new User
  function insertUser(body, session) {
    return new User({
      ...body
    }, session)
    .save(session)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return app.helpers.reject({
        code: "500",
        type: "s003",
        message: "Couldn't create User",
        display: "error.createUser",
        error
      });
    });
  }

  // Update the User
  function updateUserService(req, session) {
    const { params, body } = req;
    return User.updateOne({ "_id": params.id }, body, session)
    .then(async (data) => {
      if (!data) return app.helpers.reject(new Error('User not found'));      
      return data;
    })
    .catch((error) => {
      return app.helpers.reject({
        code: "500",
        type: "s004",
        message: "Couldn't update User",
        display: "error.updateUser",
        error
      });
    })
  }

};
