const { Router } = require('express');

module.exports = (app) => {
  const router = new Router();

  const { setupGuild, findUserById, updateUser } = app.action.guild;
  
  // Find User by id
  router.get('/:id',
    findUserById
  )

  router.post('/setup',
    setupGuild
  );
  
  // Update User by id
  router.put('/update/:id',
    updateUser
  );

  return router;
}