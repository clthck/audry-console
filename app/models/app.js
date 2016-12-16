'use strict';
module.exports = function(sequelize, DataTypes) {
  var App = sequelize.define('App', {
    title: DataTypes.STRING,
    icon: DataTypes.STRING,
    launch_url: DataTypes.STRING
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        App.belongsToMany(models.Role, { through: 'RolesApps' });
      }
    }
  });
  return App;
};