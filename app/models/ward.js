'use strict';
module.exports = function(sequelize, DataTypes) {
  var Ward = sequelize.define('Ward', {
    hospital_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING(1024),
    floor: DataTypes.STRING,
    nurse_station_id: DataTypes.INTEGER,
    beacon_major: DataTypes.INTEGER
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        Ward.belongsTo(models.NurseStation);
        Ward.hasMany(models.Supervisor);
        Ward.hasMany(models.Room);
        Ward.hasMany(models.ServiceCategoryLevel);
        Ward.hasMany(models.ServiceLevel);
      }
    }
  });
  return Ward;
};