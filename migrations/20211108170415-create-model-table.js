'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ModelTables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      modelName: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      allergies: {
        type: Sequelize.TEXT
      },
      currentMeds: {
        type: Sequelize.TEXT
      },
      medicalHistory: {
        type: Sequelize.TEXT
      },
      socialHistory: {
        type: Sequelize.TEXT
      },
      familyHistory: {
        type: Sequelize.TEXT
      },
      bp: {
        type: Sequelize.STRING
      },
      pulse: {
        type: Sequelize.FLOAT
      },
      respRate: {
        type: Sequelize.FLOAT
      },
      temp: {
        type: Sequelize.FLOAT
      },
      height: {
        type: Sequelize.FLOAT
      },
      weight: {
        type: Sequelize.FLOAT
      },
      bmi: {
        type: Sequelize.FLOAT
      },
      chiefComplaint: {
        type: Sequelize.TEXT
      },
      hpi: {
        type: Sequelize.TEXT
      },
      subject: {
        type: Sequelize.TEXT
      },
      objective: {
        type: Sequelize.TEXT
      },
      assessment: {
        type: Sequelize.TEXT
      },
      plan: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('ModelTables');
  }
};