'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      body: {
        type: Sequelize.STRING(2048),
        allowNull: false
      },
      sender_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users'
        },
        onDelete: 'cascade'
      },
      recipient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users'
        },
        onDelete: 'cascade'
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
    .then(() => queryInterface.addIndex('Messages', ['sender_id', 'recipient_id'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Messages');
  }
};