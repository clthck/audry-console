'use strict';

const Model = require('../app/models');
const User = Model.User;

User.create({
  username: 'admin',
  email: 'admin@audry.com',
  password: ' ',
});
