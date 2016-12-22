'use strict';

const authentication = require('../app/controllers/concerns/authentication.js');
const { sessions, activities } = require('../app/controllers');

module.exports = (routers) => {
  // Resources that don't need authentication.
  routers.unauthenticated
    .get('login', '/login', sessions.new)
    .post('/login', sessions.create);

  // Resources that require authentication.
  routers.authenticated
    .use(authentication.do)
    .get('root', '/', activities.index)
    .get('logout', '/logout', sessions.destroy);
};
