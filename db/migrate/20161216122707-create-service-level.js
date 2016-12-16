'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('ServiceLevels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ward_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Wards'
        }
      },
      service_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Services'
        },
        onDelete: 'cascade'
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
      },
      visible: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    })
    .then(() => queryInterface.addIndex('ServiceLevels', ['ward_id', 'service_id'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('ServiceLevels');
  }
};