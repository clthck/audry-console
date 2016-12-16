'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('PatientsTablets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patient_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Patients'
        },
        onDelete: 'cascade'
      },
      tablet_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Tablets'
        },
        onDelete: 'cascade'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => queryInterface.addIndex('PatientsTablets', ['patient_id', 'tablet_id'], { indicesType: 'UNIQUE' }));
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('PatientsTablets');
  }
};
