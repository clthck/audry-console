'use strict';

const {
  sessions, activities,
  concerns: { authentication },
  configuration: { hospitals, wards, rooms, beds, serviceCategories },
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
    .post('hospitals', '/configuration/hospitals', hospitals.create)
    .get('editHospital', '/configuration/hospitals/:id/edit', hospitals.edit)
    .patch('hospital', '/configuration/hospitals/:id', hospitals.update)
    .get('wards', '/configuration/wards', wards.index)
    .post('/configuration/wards', wards.create)
    .get('ward', '/configuration/wards/:id', wards.show)
    .get('rooms', '/configuration/wards/:wardId/rooms', rooms.index)
    .post('/configuration/wards/:wardId/rooms', rooms.create)
    .get('room', '/configuration/wards/:wardId/rooms/:id', rooms.show)
    .get('beds', '/configuration/rooms/:roomId/beds', beds.index)
    .post('/configuration/rooms/:roomId/beds', beds.create)
    .get('bed', '/configuration/rooms/:roomId/beds/:id', beds.show)
    .get('serviceCategories', '/configuration/serviceCategories', serviceCategories.index)
    .post('serviceCategoriesBulkCreate', '/configuration/serviceCategories/bulkCreate', serviceCategories.bulkCreate);
};
