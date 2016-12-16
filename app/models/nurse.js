'use strict';
module.exports = function(sequelize, DataTypes) {
  var Nurse = sequelize.define('Nurse', {
    user_id: DataTypes.INTEGER,
    nurse_station_id: DataTypes.INTEGER
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        Nurse.belongsTo(models.User);
        Nurse.belongsTo(models.NurseStation);
        Nurse.hasMany(models.Patient);
        Nurse.hasMany(models.Request, { as: 'requestsDelegating' });
        Nurse.hasMany(models.Response, { as: 'responsesHandled' });
      }
    }
  });
  return Nurse;
};