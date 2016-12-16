'use strict';

module.exports = function(sequelize, DataTypes) {
  var NurseStation = sequelize.define('NurseStation', {
    hospital_id: DataTypes.INTEGER
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        NurseStation.belongsTo(models.Hospital);
        NurseStation.hasOne(models.Ward);
        NurseStation.hasMany(models.Nurse);
      }
    }
  });

  return NurseStation;
};