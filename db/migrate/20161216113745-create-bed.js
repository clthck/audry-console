'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Beds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      room_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Rooms'
        },
        onDelete: 'cascade'
      },
      name: {
        type: Sequelize.STRING
      },
      beacon_minor: {
        type: Sequelize.INTEGER
      },
      button_id: {
        type: Sequelize.STRING
      },
      task_light_id: {
        type: Sequelize.STRING
      },
      main_light_id: {
        type: Sequelize.STRING
      },
      remote_id: {
        type: Sequelize.STRING
      }
    })
    .then(() => queryInterface.addIndex('Beds', ['room_id', 'name'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Beds');
  }
};