'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tablet = sequelize.define('Tablet', {
    udid: DataTypes.STRING,
    last_known_location: DataTypes.STRING,
    last_known_battery_level: DataTypes.INTEGER,
    access_code: DataTypes.STRING
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        Tablet.belongsToMany(models.Patient, { through: 'PatientsTablets' });
      }
    }
  });
  return Tablet;
};