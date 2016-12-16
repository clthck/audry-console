'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Physicians', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users'
        },
        onDelete: 'cascade'
      },
      hospital_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Hospitals'
        },
        onDelete: 'cascade'
      }
    })
    .then(() => queryInterface.addIndex('Physicians', ['user_id'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Physicians');
  }
};