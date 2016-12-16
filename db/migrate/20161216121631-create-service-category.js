'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('ServiceCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
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
    .then(() => queryInterface.addIndex('ServiceCategories', ['hospital_id', 'name'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('ServiceCategories');
  }
};