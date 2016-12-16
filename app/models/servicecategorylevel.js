'use strict';
module.exports = function(sequelize, DataTypes) {
  var ServiceCategoryLevel = sequelize.define('ServiceCategoryLevel', {
    service_category_id: DataTypes.INTEGER,
    ward_id: DataTypes.INTEGER,
    level_1: DataTypes.INTEGER,
    level_2: DataTypes.INTEGER,
    level_3: DataTypes.INTEGER
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        ServiceCategoryLevel.belongsTo(models.ServiceCategory);
        ServiceCategoryLevel.belongsTo(models.Ward);
      }
    }
  });
  return ServiceCategoryLevel;
};