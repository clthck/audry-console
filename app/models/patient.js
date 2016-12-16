'use strict';
module.exports = function(sequelize, DataTypes) {
  var Patient = sequelize.define('Patient', {
    user_id: DataTypes.INTEGER,
    phone_number: DataTypes.STRING,
    bed_id: DataTypes.INTEGER,
    language: DataTypes.STRING,
    primary_nurse_id: DataTypes.INTEGER,
    primary_physician_id: DataTypes.INTEGER,
    interface_ward_id: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Patient.belongsTo(models.User);
        Patient.belongsTo(models.Bed);
        Patient.belongsTo(models.Nurse, { as: 'primary_nurse' });
        Patient.belongsTo(models.Physician, { as: 'primary_physician' });
        Patient.belongsTo(models.Ward, { as: 'interface_ward' });
        Patient.belongsToMany(models.Tablet, { through: 'PatientsTablets' });
        Patient.hasMany(models.Request);
      }
    }
  });
  return Patient;
};