'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('NurseStations', {
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
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('NurseStations');
  }
};