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
        type: Sequelize.STRING
      },
      1 _bedroom_centre: {
        type: Sequelize.INTEGER
      },
      1 _bedroom_outside_centre: {
        type: Sequelize.INTEGER
      },
      childcare: {
        type: Sequelize.INTEGER
      },
      utilities_internet: {
        type: Sequelize.INTEGER
      },
      gas: {
        type: Sequelize.INTEGER
      },
      month_pass: {
        type: Sequelize.INTEGER
      },
      meal_average: {
        type: Sequelize.INTEGER
      },
      gallon_milk: {
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