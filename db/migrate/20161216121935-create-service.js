'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'ServiceCategories'
        },
        onDelete: 'cascade'
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      icon: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING(1024)
      },
      notification_message: {
        type: Sequelize.STRING(1024)
      },
      launch_app_url: {
        type: Sequelize.STRING
      }
    })
    .then(() => queryInterface.addIndex('Services', ['category_id', 'name'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Services');
  }
};