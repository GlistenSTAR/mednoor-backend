'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Description extends Model {
    static associate(models) {
      Description.belongsTo(models.Patient, {
        foreignKey: 'patientId',
        onDelete: 'CASCADE'
      });
    }
  };
  Description.init({
    chiefComplaint: DataTypes.STRING,
    hpi: DataTypes.STRING,
    subject: DataTypes.STRING,
    objective: DataTypes.STRING,
    assessment: DataTypes.STRING,
    plan: DataTypes.STRING,
    date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Description',
  });
  return Description;
};
