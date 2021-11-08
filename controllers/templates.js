const fs = require('fs');

const Patient = require('../models').Patient;
const Model = require('../models').ModelTable;

const validatePatientInput = require('../validation/patient');
const validatePrintDataInput = require('../validation/printTemp');
const validateModelDataInput = require('../validation/modelName');

const createPDF = require('../libs/createPDF');

const isEmpty = require('../validation/is-empty');

exports.saveTemplate = async (req, res) => {
  const patientData = {
    userId: req.user.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    date: req.body.date,
    allergies: req.body.history.allergies,
    currentMeds: req.body.history.currentMeds,
    medicalHistory: req.body.history.medicalHistory,
    socialHistory: req.body.history.socialHistory,
    familyHistory: req.body.history.familyHistory,
    bp: req.body.state.bp,
    pulse: req.body.state.pulse,
    respRate: req.body.state.respRate,
    temp: req.body.state.temp,
    height: req.body.state.height,
    weight: req.body.state.weight,
    bmi: req.body.state.bmi,
    chiefComplaint: req.body.description.chiefComplaint,
    hpi: req.body.description.hpi,
    subject: req.body.description.subject,
    objective: req.body.description.objective,
    assessment: req.body.description.assessment,
    plan: req.body.description.plan
  };

  patientData.pulse = !isEmpty(patientData.pulse) ? patientData.pulse : 0;
  patientData.respRate = !isEmpty(patientData.respRate) ? patientData.respRate : 0;
  patientData.temp = !isEmpty(patientData.temp) ? patientData.temp : 0;
  patientData.height = !isEmpty(patientData.height) ? patientData.height : 0;
  patientData.weight = !isEmpty(patientData.weight) ? patientData.weight : 0;
  patientData.bmi = !isEmpty(patientData.bmi) ? patientData.bmi : 0;

  const { errors, isValid } = validatePatientInput(patientData);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const patient = await Patient.findOne({
      where: {
        firstName: patientData.firstName,
        lastName: patientData.lastName,
        date: patientData.date
      }
    });

    if (isEmpty(patient)) {
      await Patient.create(patientData);
    } else {
      await patient.update(patientData);
    }

    res.json({ msg: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

// Update template
exports.updateTemplate = async (req, res) => {
  const patient = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    date: req.body.date,
    allergies: req.body.history.allergies,
    currentMeds: req.body.history.currentMeds,
    medicalHistory: req.body.history.medicalHistory,
    socialHistory: req.body.history.socialHistory,
    familyHistory: req.body.history.familyHistory,
    bp: req.body.state.bp,
    pulse: req.body.state.pulse,
    respRate: req.body.state.respRate,
    temp: req.body.state.temp,
    height: req.body.state.height,
    weight: req.body.state.weight,
    bmi: req.body.state.bmi,
    chiefComplaint: req.body.description.chiefComplaint,
    hpi: req.body.description.hpi,
    subject: req.body.description.subject,
    objective: req.body.description.objective,
    assessment: req.body.description.assessment,
    plan: req.body.description.plan
  };

  const { errors, isValid } = validatePatientInput(patient);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    await Patient.update({
      ...patient
    }, {
      where: {
        id: req.params.tempId
      }
    });

    res.json({ msg: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

// Create Model
exports.createAndUpdateModel = async (req, res) => {
  const modelData = {
    userId: req.user.id,
    modelName: req.body.modelName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    date: req.body.date,
    allergies: req.body.history.allergies,
    currentMeds: req.body.history.currentMeds,
    medicalHistory: req.body.history.medicalHistory,
    socialHistory: req.body.history.socialHistory,
    familyHistory: req.body.history.familyHistory,
    bp: req.body.state.bp,
    pulse: req.body.state.pulse,
    respRate: req.body.state.respRate,
    temp: req.body.state.temp,
    height: req.body.state.height,
    weight: req.body.state.weight,
    bmi: req.body.state.bmi,
    chiefComplaint: req.body.description.chiefComplaint,
    hpi: req.body.description.hpi,
    subject: req.body.description.subject,
    objective: req.body.description.objective,
    assessment: req.body.description.assessment,
    plan: req.body.description.plan
  };

  modelData.pulse = !isEmpty(modelData.pulse) ? modelData.pulse : 0;
  modelData.respRate = !isEmpty(modelData.respRate) ? modelData.respRate : 0;
  modelData.temp = !isEmpty(modelData.temp) ? modelData.temp : 0;
  modelData.height = !isEmpty(modelData.height) ? modelData.height : 0;
  modelData.weight = !isEmpty(modelData.weight) ? modelData.weight : 0;
  modelData.bmi = !isEmpty(modelData.bmi) ? modelData.bmi : 0;

  const { errors, isValid } = validateModelDataInput(modelData);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const model = await Model.findOne({
      where: {
        modelName: modelData.modelName
      }
    });

    if (isEmpty(model)) {
      await Model.create(modelData);
    } else {
      await Model.update(
        { ...modelData }, {
        where: {
          modelName: modelData.modelName
        }
      }
      );
    }

    res.json({ msg: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

// Search Model with model name
exports.searchModel = async (req, res) => {
  try {
    const models = await Model.findAll({
      where: {
        userId: req.user.id
      }
    });

    res.json({ models: models, msg: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

// Search templates with Firstname, Lastname, Date
exports.searchTemplate = async (req, res) => {
  const { firstName, lastName, date } = req.body;

  // const { errors, isValid } = validateSearchKeyInput(req.body);

  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  try {
    let searchResults;

    if (!isEmpty(firstName) && !isEmpty(lastName) && !isEmpty(date)) {
      searchResults = await Patient.findAll({
        where: {
          firstName: firstName,
          lastName: lastName,
          date: date,
          userId: req.user.id
        }
      });
    } else if (isEmpty(firstName) && !isEmpty(lastName) && !isEmpty(date)) {
      searchResults = await Patient.findAll({
        where: {
          lastName: lastName,
          date: date,
          userId: req.user.id
        }
      });
    } else if (!isEmpty(firstName) && isEmpty(lastName) && !isEmpty(date)) {
      searchResults = await Patient.findAll({
        where: {
          firstName: firstName,
          date: date,
          userId: req.user.id
        }
      });
    } else if (!isEmpty(firstName) && !isEmpty(lastName) && isEmpty(date)) {
      searchResults = await Patient.findAll({
        where: {
          firstName: firstName,
          lastName: lastName,
          userId: req.user.id
        }
      });
    } else if (!isEmpty(firstName) && isEmpty(lastName) && isEmpty(date)) {
      searchResults = await Patient.findAll({
        where: {
          firstName: firstName,
          userId: req.user.id
        }
      });
    } else if (isEmpty(firstName) && !isEmpty(lastName) && isEmpty(date)) {
      searchResults = await Patient.findAll({
        where: {
          lastName: lastName,
          userId: req.user.id
        }
      });
    } else if (isEmpty(firstName) && isEmpty(lastName) && !isEmpty(date)) {
      searchResults = await Patient.findAll({
        where: {
          date: date,
          userId: req.user.id
        }
      });
    } else if (isEmpty(firstName) && isEmpty(lastName) && isEmpty(date)) {
      searchResults = await Patient.findAll({
        where: {
          userId: req.user.id
        }
      });
    }

    res.json({ searchResults, msg: 'success' })
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

// Delete template
exports.deleteTemplate = async (req, res) => {
  try {
    await Patient.destroy({
      where: { id: req.params.tempId }
    });
    res.json({ msg: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

// Delete model
exports.deleteModel = async (req, res) => {
  try {
    await Model.destroy({
      where: {
        id: req.params.modelId
      }
    });

    res.json({ msg: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

// Print template to PDF
exports.printTemplate = async (req, res) => {
  const { errors, isValid } = validatePrintDataInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const path = await createPDF(req.body);
    res.json({ msg: 'success', path: path });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
