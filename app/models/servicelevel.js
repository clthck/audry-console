'use strict';
module.exports = function(sequelize, DataTypes) {
  var ServiceLevel = sequelize.define('ServiceLevel', {
    ward_id: DataTypes.INTEGER,
    service_id: DataTypes.INTEGER,
    level_1: DataTypes.INTEGER,
    level_2: DataTypes.INTEGER,
    level_3: DataTypes.INTEGER,
    visible: DataTypes.BOOLEAN
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        ServiceLevel.belongsTo(models.Ward);
        ServiceLevel.belongsTo(models.Service);
      }
    }
  });
  return ServiceLevel;
};