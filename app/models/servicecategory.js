'use strict';
module.exports = function(sequelize, DataTypes) {
  var ServiceCategory = sequelize.define('ServiceCategory', {
    name: DataTypes.STRING,
    hospital_id: DataTypes.INTEGER
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        ServiceCategory.belongsTo(models.Hospital);
        ServiceCategory.hasMany(models.Service);
        ServiceCategory.hasMany(models.ServiceCategoryLevel);
      }
    }
  });
  return ServiceCategory;
};