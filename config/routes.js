'use strict';

const {
  sessions, activities,
  concerns: { authentication },
  configuration: { hospitals },
} = require('../app/controllers');

module.exports = (routers) => {
  // Resources that don't need authentication.
  routers.unauthenticated
    .get('login', '/login', sessions.new)
    .post('/login', sessions.create);

  // Resources that require authentication.
  routers.authenticated
    .use(authentication.do)
    .use(hospitals.ensureHospitalInfoExists)
    .get('root', '/', activities.index)
    .delete('logout', '/logout', sessions.destroy)
    .get('newHospital', '/configuration/hospitals/new', hospitals.new)
    .post('hospitals', '/configuration/hospitals', hospitals.create);
};
