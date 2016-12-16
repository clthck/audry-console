'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Patients', {
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
      phone_number: {
        type: Sequelize.STRING
      },
      bed_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Beds'
        },
        onDelete: 'set null'
      },
      language: {
        type: Sequelize.STRING
      },
      primary_nurse_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Nurses'
        }
      },
      primary_physician_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Physicians'
        }
      },
      interface_ward_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Wards'
        }
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
    .then(() => queryInterface.addIndex('Patients', ['user_id'], { indicesType: 'UNIQUE' }))
    .then(() => queryInterface.addIndex('Patients', ['bed_id'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Patients');
  }
};