'use strict';

const sessions = require('../app/controllers/sessions_controller.js');
const authentication = require('../app/controllers/concerns/authentication.js');
const activities = require('../app/controllers/activities_controller.js');

module.exports = (routers) => {
  // Router for unauthenticated URLs.
  routers.unauthenticated
    .get('login', '/login', sessions.new)
    .post('/login', sessions.create());

  // Router for authenticated URLs.
  routers.authenticated
    .use(authentication.do)
    .get('/', activities.index)
    .get('logout', '/logout', sessions.destroy);
};
