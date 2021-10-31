'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Currencies', {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userID: {
        type: Sequelize.BIGINT,
        unique: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      money: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
      },
      exp: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
      },
      dailyTime: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
      },
      workTime: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
      },
      ghepTime: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
      },
      stealTime: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
      },
      slutTime: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
      },
      crimeTime: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
      }, 
      fishy: {
        type: Sequelize.JSON
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Currencies');
  }
};