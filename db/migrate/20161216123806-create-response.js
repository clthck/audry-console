'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Responses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      request_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Requests'
        },
        onDelete: 'cascade'
      },
      responder_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Nurses'
        }
      },
      message: {
        type: Sequelize.STRING(1024)
      },
      notes: {
        type: Sequelize.STRING(1024)
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => queryInterface.addIndex('Responses', ['request_id', 'responder_id'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Responses');
  }
};