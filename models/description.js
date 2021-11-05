'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Description extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
// module.exports = (sequelize, DataTypes) => {
//   const Description = sequelize.define('Description', {
//     chiefComplaint: DataTypes.STRING,
//     hpi: DataTypes.STRING,
//     subject: DataTypes.STRING,
//     objective: DataTypes.STRING,
//     assessment: DataTypes.STRING,
//     plan: DataTypes.STRING,
//     date: DataTypes.STRING
//   }, {});

//   Description.associate = function (models) {
//     Description.belongsTo(models.Patient, {
//       foreignKey: 'patientId',
//       onDelete: 'CASCADE'
//     });
//   }

//   return Description;
// }