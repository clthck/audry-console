'use strict';
module.exports = function(sequelize, DataTypes) {
  var Bed = sequelize.define('Bed', {
    room_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    beacon_minor: DataTypes.INTEGER,
    button_id: DataTypes.STRING,
    task_light_id: DataTypes.STRING,
    main_light_id: DataTypes.STRING,
    remote_id: DataTypes.STRING
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        Bed.belongsTo(models.Room);
        Bed.hasOne(models.Patient);
      }
    }
  });
  return Bed;
};