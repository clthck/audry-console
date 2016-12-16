'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('GpsLocations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lat_1: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      lng_1: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      lat_2: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      lng_2: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      }
    })
    .then(() => queryInterface.addIndex('GpsLocations', ['lat_1', 'lng_1', 'lat_2', 'lng_2'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('GpsLocations');
  }
};