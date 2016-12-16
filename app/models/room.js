'use strict';
module.exports = function(sequelize, DataTypes) {
  var Room = sequelize.define('Room', {
    ward_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        Room.belongsTo(models.Ward);
        Room.hasMany(models.Bed);
      }
    }
  });
  return Room;
};