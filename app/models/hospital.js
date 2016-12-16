'use strict';
module.exports = function(sequelize, DataTypes) {
  var Hospital = sequelize.define('Hospital', {
    name: DataTypes.STRING,
    division: DataTypes.STRING,
    address_1: DataTypes.STRING,
    address_2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    logo_light_file_name: DataTypes.STRING,
    logo_dark_file_name: DataTypes.STRING,
    beacon_uuid: DataTypes.STRING,
    major: DataTypes.INTEGER
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        Hospital.hasMany(models.NurseStation);
        Hospital.hasMany(models.Physician);
        Hospital.hasMany(models.ServiceCategory);
        Hospital.hasMany(models.BeaconLocation);
      }
    }
  });
  return Hospital;
};