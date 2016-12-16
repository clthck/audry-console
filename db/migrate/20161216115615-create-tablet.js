'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Tablets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      udid: {
        allowNull: false,
        type: Sequelize.STRING
      },
      last_known_location: {
        type: Sequelize.STRING
      },
      last_known_battery_level: {
        type: Sequelize.INTEGER
      },
      access_code: {
        type: Sequelize.STRING
      }
    })
    .then(() => queryInterface.addIndex('Tablets', ['udid'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Tablets');
  }
};