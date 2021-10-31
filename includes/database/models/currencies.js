'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Currencies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  Currencies.init({
    userID: DataTypes.BIGINT,
    name: DataTypes.STRING,
    money: DataTypes.BIGINT,
    exp: DataTypes.BIGINT,
    dailyTime: DataTypes.BIGINT,
    workTime: DataTypes.BIGINT,
    ghepTime: DataTypes.BIGINT,
    crimeTime: DataTypes.BIGINT,
    slutTime: DataTypes.BIGINT,
    stealTime: DataTypes.BIGINT,
    fishy: DataTypes.JSON
  },
  {
    sequelize,
    modelName: 'Currencies',
  });
  return Currencies;
};