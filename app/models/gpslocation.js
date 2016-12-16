'use strict';
module.exports = function(sequelize, DataTypes) {
  var GpsLocation = sequelize.define('GpsLocation', {
    lat_1: DataTypes.FLOAT,
    lng_1: DataTypes.FLOAT,
    lat_2: DataTypes.FLOAT,
    lng_2: DataTypes.FLOAT,
    name: DataTypes.STRING
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return GpsLocation;
};