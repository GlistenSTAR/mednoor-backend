'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ModelTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ModelTable.init({
    userId: DataTypes.INTEGER,
    modelName: DataTypes.STRING,
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
    modelName: 'ModelTable',
  });
  return ModelTable;
};