'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Descriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chiefComplaint: {
        type: Sequelize.STRING
      },
      hpi: {
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.STRING
      },
      objective: {
        type: Sequelize.STRING
      },
      assessment: {
        type: Sequelize.STRING
      },
      plan: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Descriptions');
  }
};