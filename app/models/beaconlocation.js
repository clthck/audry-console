'use strict';
module.exports = function(sequelize, DataTypes) {
  var BeaconLocation = sequelize.define('BeaconLocation', {
    hospital_id: DataTypes.INTEGER,
    beacon_major: DataTypes.INTEGER,
    beacon_minor: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        BeaconLocation.belongsTo(models.Hospital);
      }
    }
  });
  return BeaconLocation;
};