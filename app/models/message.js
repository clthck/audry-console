'use strict';
module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define('Message', {
    body: DataTypes.STRING(2048),
    sender_id: DataTypes.INTEGER,
    recipient_id: DataTypes.INTEGER,
    notes: DataTypes.STRING(1024)
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Message.belongsTo(models.User, { as: 'sender' });
        Message.belongsTo(models.User, { as: 'recipient' });
      }
    }
  });
  return Message;
};