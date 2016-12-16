'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Apps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      icon: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      launch_url: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
    .then(() => queryInterface.addIndex('Apps', ['launch_url'], { indicesType: 'UNIQUE' }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Apps');
  }
};