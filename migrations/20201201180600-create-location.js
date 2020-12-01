'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      city_id: {
        type: Sequelize.INTEGER
      },
      bedroom_in_city: {
        type: Sequelize.INTEGER
      },
      bedroom_outside_centre: {
        type: Sequelize.INTEGER
      },
      childcare: {
        type: Sequelize.INTEGER
      },
      utilities: {
        type: Sequelize.INTEGER
      },
      internet: {
        type: Sequelize.INTEGER
      },
      gas: {
        type: Sequelize.INTEGER
      },
      public_transit: {
        type: Sequelize.INTEGER
      },
      average_meal: {
        type: Sequelize.INTEGER
      },
      milk: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('locations');
  }
};