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
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    date: DataTypes.STRING,
    allergies: DataTypes.STRING,
    currentMeds: DataTypes.STRING,
    medicalHistory: DataTypes.STRING,
    socialHistory: DataTypes.STRING,
    familyHistory: DataTypes.STRING,
    bp: DataTypes.FLOAT,
    pulse: DataTypes.FLOAT,
    respRate: DataTypes.FLOAT,
    temp: DataTypes.FLOAT,
    height: DataTypes.FLOAT,
    weight: DataTypes.FLOAT,
    bmi: DataTypes.FLOAT,
    chiefComplaint: DataTypes.STRING,
    hpi: DataTypes.STRING,
    subject: DataTypes.STRING,
    objective: DataTypes.STRING,
    assessment: DataTypes.STRING,
    plan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};