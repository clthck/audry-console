'use strict';
module.exports = function(sequelize, DataTypes) {
  var Physician = sequelize.define('Physician', {
    user_id: DataTypes.INTEGER,
    hospital_id: DataTypes.INTEGER
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        Physician.belongsTo(models.User);
        Physician.belongsTo(models.Hospital);
        Physician.hasMany(models.Patient);
      }
    }
  });
  return Physician;
};