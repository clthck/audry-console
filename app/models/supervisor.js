'use strict';
module.exports = function(sequelize, DataTypes) {
  var Supervisor = sequelize.define('Supervisor', {
    user_id: DataTypes.INTEGER,
    ward_id: DataTypes.INTEGER
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        Supervisor.belongsTo(models.User);
        Supervisor.belongsTo(models.Ward);
      }
    }
  });
  return Supervisor;
};