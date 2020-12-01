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
    city_id: DataTypes.STRING,
    1 _bedroom_centre: DataTypes.INTEGER,
    1 _bedroom_outside_centre: DataTypes.INTEGER,
    childcare: DataTypes.INTEGER,
    utilities_internet: DataTypes.INTEGER,
    gas: DataTypes.INTEGER,
    month_pass: DataTypes.INTEGER,
    meal_average: DataTypes.INTEGER,
    gallon_milk: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'location',
  });
  return location;
};