'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Hospitals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      division: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address_1: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address_2: {
        type: Sequelize.STRING
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING
      },
      zipcode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      logo_light_file_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      logo_dark_file_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      beacon_uuid: {
        allowNull: false,
        type: Sequelize.STRING
      },
      major: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Hospitals');
  }
};