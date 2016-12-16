'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Nurses', {
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
      nurse_station_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'NurseStations'
        },
        onDelete: 'cascade'
      }
    })
    .then(() => queryInterface.addIndex('Nurses', ['user_id'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Nurses');
  }
};