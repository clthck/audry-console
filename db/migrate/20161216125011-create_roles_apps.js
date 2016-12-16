'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('RolesApps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles'
        },
        onDelete: 'cascade'
      },
      app_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Apps'
        },
        onDelete: 'cascade'
      }
    })
    .then(() => queryInterface.addIndex('RolesApps', ['role_id', 'app_id'], { indicesType: 'UNIQUE' }));
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('RolesApps');
  }
};
