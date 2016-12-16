'use strict';

const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    current_location: DataTypes.STRING,
    current_location_tracked_at: DataTypes.DATE,
    last_known_location: DataTypes.STRING,
    last_location_tracked_at: DataTypes.DATE
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        User.hasOne(models.Nurse);
        User.hasOne(models.Supervisor);
        User.hasOne(models.Physician);
        User.hasOne(models.Patient);
        User.belongsToMany(models.Role, { through: 'UsersRoles' });
      }
    }
  });

  const beforeSave = (user, options) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
  };

  User
    .beforeCreate(beforeSave)
    .beforeUpdate(beforeSave);

  return User;
};