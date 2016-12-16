'use strict';
module.exports = function(sequelize, DataTypes) {
  var Response = sequelize.define('Response', {
    request_id: DataTypes.INTEGER,
    responder_id: DataTypes.INTEGER,
    message: DataTypes.STRING(1024),
    notes: DataTypes.STRING(1024)
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Response.belongsTo(models.Request);
        Response.belongsTo(models.Nurse, { as: 'responder' });
      }
    }
  });
  return Response;
};