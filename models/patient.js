'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    static associate(models) {
      // define association here
    }
  };
  Patient.init({
    userId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    date: DataTypes.STRING,
    allergies: DataTypes.TEXT,
    currentMeds: DataTypes.TEXT,
    medicalHistory: DataTypes.TEXT,
    socialHistory: DataTypes.TEXT,
    familyHistory: DataTypes.TEXT,
    bp: DataTypes.STRING,
    pulse: DataTypes.FLOAT,
    respRate: DataTypes.FLOAT,
    temp: DataTypes.FLOAT,
    height: DataTypes.FLOAT,
    weight: DataTypes.FLOAT,
    bmi: DataTypes.FLOAT,
    chiefComplaint: DataTypes.TEXT,
    hpi: DataTypes.TEXT,
    subject: DataTypes.TEXT,
    objective: DataTypes.TEXT,
    assessment: DataTypes.TEXT,
    plan: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};