'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PatientState extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PatientState.belongsTo(models.Patient, {
        foreignKey: 'patientId',
        onDelete: 'CASCADE'
      });
    }
  };
  PatientState.init({
    bp: DataTypes.FLOAT,
    pulse: DataTypes.FLOAT,
    respRate: DataTypes.FLOAT,
    temp: DataTypes.FLOAT,
    height: DataTypes.FLOAT,
    weight: DataTypes.FLOAT,
    bmi: DataTypes.FLOAT,
    date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PatientState',
  });
  return PatientState;
};
