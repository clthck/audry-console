'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Patients'
        }
      },
      service_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Services'
        },
        onDelete: 'cascade'
      },
      assigner_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Nurses'
        }
      },
      assigned_at: {
        type: Sequelize.DATE
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
    .then(() => queryInterface.addIndex('Requests', ['patient_id', 'service_id'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Requests');
  }
};