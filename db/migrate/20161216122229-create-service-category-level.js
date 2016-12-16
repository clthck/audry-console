'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('ServiceCategoryLevels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      service_category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'ServiceCategories'
        },
        onDelete: 'cascade'
      },
      ward_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Wards'
        }
      },
      level_1: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      level_2: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      level_3: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    })
    .then(() => queryInterface.addIndex('ServiceCategoryLevels', ['service_category_id', 'ward_id'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('ServiceCategoryLevels');
  }
};