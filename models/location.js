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
    city_id: DataTypes.INTEGER,
    bedroom_in_city: DataTypes.INTEGER,
    bedroom_outside_centre: DataTypes.INTEGER,
    childcare: DataTypes.INTEGER,
    utilities: DataTypes.INTEGER,
    internet: DataTypes.INTEGER,
    gas: DataTypes.INTEGER,
    public_transit: DataTypes.INTEGER,
    average_meal: DataTypes.INTEGER,
    milk: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'location',
  });
  return location;
};