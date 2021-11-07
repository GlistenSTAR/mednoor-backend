'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
        type: Sequelize.STRING
      },
      currentMeds: {
        type: Sequelize.STRING
      },
      medicalHistory: {
        type: Sequelize.STRING
      },
      socialHistory: {
        type: Sequelize.STRING
      },
      familyHistory: {
        type: Sequelize.STRING
      },
      bp: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('Patients');
  }
};