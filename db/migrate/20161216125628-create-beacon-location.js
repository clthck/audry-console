'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('BeaconLocations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hospital_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Hospitals'
        },
        onDelete: 'cascade'
      },
      beacon_major: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      beacon_minor: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      }
    })
    .then(() => queryInterface.addIndex('BeaconLocations', ['hospital_id', 'beacon_major', 'beacon_minor'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('BeaconLocations');
  }
};