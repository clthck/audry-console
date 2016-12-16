'use strict';
module.exports = function(sequelize, DataTypes) {
  var Request = sequelize.define('Request', {
    patient_id: DataTypes.INTEGER,
    service_id: DataTypes.INTEGER,
    assigner_id: DataTypes.INTEGER,
    assigned_at: DataTypes.DATE
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Request.belongsTo(models.Patient);
        Request.belongsTo(models.Service);
        Request.belongsTo(models.Nurse, { as: 'assigner' });
        Request.hasOne(models.Response);
      }
    }
  });
  return Request;
};