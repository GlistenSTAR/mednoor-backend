const fs = require('fs');

const Patient = require('../models').Patient;
const PatientState = require('../models').PatientState;
const Description = require('../models').Description;

const validatePatientInput = require('../validation/patient');
const validatePrintDataInput = require('../validation/printTemp');
// const validateSearchKeyInput = require('../validation/searchTemp');

const createPDF = require('../libs/createPDF');

const isEmpty = require('../validation/is-empty');

exports.saveTemplate = async (req, res) => {
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
    await Patient.create(patient);

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
          date: date
        }
      });
    } else if (isEmpty(firstName) && !isEmpty(lastName) && !isEmpty(date)) {
      searchResults = await Patient.findAll({
        where: {
          lastName: lastName,
          date: date
        }
      });
    } else if (!isEmpty(firstName) && isEmpty(lastName) && !isEmpty(date)) {
      searchResults = await Patient.findAll({
        where: {
          firstName: firstName,
          date: date
        }
      });
    } else if (!isEmpty(firstName) && !isEmpty(lastName) && isEmpty(date)) {
      searchResults = await Patient.findAll({
        where: {
          firstName: firstName,
          lastName: lastName
        }
      });
    } else if (!isEmpty(firstName) && isEmpty(lastName) && isEmpty(date)) {
      searchResults = await Patient.findAll({
        where: {
          firstName: firstName
        }
      });
    } else if (isEmpty(firstName) && !isEmpty(lastName) && isEmpty(date)) {
      searchResults = await Patient.findAll({
        where: {
          lastName: lastName
        }
      });
    } else if (isEmpty(firstName) && isEmpty(lastName) && !isEmpty(date)) {
      searchResults = await Patient.findAll({
        where: {
          date: date
        }
      });
    } else if (isEmpty(firstName) && isEmpty(lastName) && isEmpty(date)) {
      searchResults = await Patient.findAll();
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
