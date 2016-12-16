'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Wards', {
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
        }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING(1024)
      },
      floor: {
        type: Sequelize.STRING
      },
      nurse_station_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'NurseStations'
        },
        onDelete: 'cascade'
      },
      beacon_major: {
        type: Sequelize.INTEGER
      }
    })
    .then(() => queryInterface.addIndex('Wards', ['hospital_id', 'name'], { indicesType: 'UNIQUE', indexName: 'hospital_id_name_index' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Wards');
  }
};