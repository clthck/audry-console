'use strict';
module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    name: DataTypes.STRING
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        Role.belongsToMany(models.User, { through: 'UsersRoles' });
        Role.belongsToMany(models.App, { through: 'RolesApps' });
      }
    }
  });
  return Role;
};