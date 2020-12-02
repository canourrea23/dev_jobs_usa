'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  location.init({
    bedroom_in_city: DataTypes.FLOAT,
    bedroom_outside_centre: DataTypes.FLOAT,
    childcare: DataTypes.FLOAT,
    utilities: DataTypes.FLOAT,
    internet: DataTypes.FLOAT,
    gas: DataTypes.FLOAT,
    public_transit: DataTypes.FLOAT,
    average_meal: DataTypes.FLOAT,
    milk: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'location',
  });
  return location;
};