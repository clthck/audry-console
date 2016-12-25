'use strict';

const { sessions, activities, hospitals } = require('../app/controllers');

module.exports = (routers) => {
  // Resources that don't need authentication.
  routers.unauthenticated
    .get('login', '/login', sessions.new)
    .post('/login', sessions.create);

  // Resources that require authentication.
  routers.authenticated
    .get('root', '/', activities.index)
    .get('logout', '/logout', sessions.destroy)
    .get('newHospital', '/hospitals/new', hospitals.new);
};
