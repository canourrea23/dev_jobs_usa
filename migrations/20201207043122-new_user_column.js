'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users', 
      'favoriteCity',
      Sequelize.TEXT,

    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'users', 
      'favoriteCity',
    )
  }
};
