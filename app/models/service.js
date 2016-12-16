'use strict';
module.exports = function(sequelize, DataTypes) {
  var Service = sequelize.define('Service', {
    category_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    description: DataTypes.STRING(1024),
    notification_message: DataTypes.STRING(1024),
    launch_app_url: DataTypes.STRING
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        Service.belongsTo(models.ServiceCategory, { as: 'category' });
        Service.hasMany(models.ServiceLevel);
        Service.hasMany(models.Request);
      }
    }
  });
  return Service;
};