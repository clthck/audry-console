'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('UsersRoles', {
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
      role_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles'
        },
        onDelete: 'cascade'
      }
    })
    .then(() => queryInterface.addIndex('UsersRoles', ['user_id', 'role_id'], { indicesType: 'UNIQUE' }));
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('UsersRoles');
  }
};
