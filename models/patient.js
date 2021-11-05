'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.hasMany(models.PatientState, {
        foreignKey: 'patientId',
        as: 'PatientStates'
      });
      Patient.hasMany(models.Description, {
        foreignKey: 'patientId',
        as: 'Descriptions'
      });
    }
  };
  Patient.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    allergies: DataTypes.STRING,
    currentMeds: DataTypes.STRING,
    medicalHistory: DataTypes.STRING,
    socialHistory: DataTypes.STRING,
    familyHistory: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};