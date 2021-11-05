const Patient = require('../models').Patient;
const PatientState = require('../models').PatientState;
const Description = require('../models').Description;

const validatePatientInput = require('../validation/patient');
const validatePrintDataInput = require('../validation/printTemp');
// const validateSearchKeyInput = require('../validation/searchTemp');

const isEmpty = require('../validation/is-empty');

exports.saveTemplate = async (req, res) => {
  const patient = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    allergies: req.body.history.allergies,
    currentMeds: req.body.history.currentMeds,
    medicalHistory: req.body.history.medicalHistory,
    socialHistory: req.body.history.socialHistory,
    familyHistory: req.body.history.familyHistory
  };

  const state = {
    bp: req.body.state.bp,
    pulse: req.body.state.pulse,
    respRate: req.body.state.respRate,
    temp: req.body.state.temp,
    height: req.body.state.height,
    weight: req.body.state.weight,
    bmi: req.body.state.bmi,
    date: req.body.date
  };

  const description = {
    chiefComplaint: req.body.description.chiefComplaint,
    hpi: req.body.description.hpi,
    subject: req.body.description.subject,
    objective: req.body.description.objective,
    assessment: req.body.description.assessment,
    plan: req.body.description.plan,
    date: req.body.date
  }

  const { errors, isValid } = validatePatientInput(patient);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    await Patient.create({
      ...patient,
      PatientStates: state,
      Descriptions: description
    }, {
      include: [
        {
          model: PatientState,
          as: 'PatientStates'
        },
        {
          model: Description,
          as: 'Descriptions'
        }
      ]
    });

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
    allergies: req.body.history.allergies,
    currentMeds: req.body.history.currentMeds,
    medicalHistory: req.body.history.medicalHistory,
    socialHistory: req.body.history.socialHistory,
    familyHistory: req.body.history.familyHistory
  };

  const state = {
    bp: req.body.state.bp,
    pulse: req.body.state.pulse,
    respRate: req.body.state.respRate,
    temp: req.body.state.temp,
    height: req.body.state.height,
    weight: req.body.state.weight,
    bmi: req.body.state.bmi,
    date: req.body.date
  };

  const description = {
    chiefComplaint: req.body.description.chiefComplaint,
    hpi: req.body.description.hpi,
    subject: req.body.description.subject,
    objective: req.body.description.objective,
    assessment: req.body.description.assessment,
    plan: req.body.description.plan,
    date: req.body.date
  }

  const { errors, isValid } = validatePatientInput(patient);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    await Patient.update({
      ...patient,
      PatientStates: state,
      Descriptions: description,
      include: [
        {
          model: PatientState,
          as: 'PatientStates'
        },
        {
          model: Description,
          as: 'Descriptions'
        }
      ]
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
          lastName: lastName
        },
        include: [
          {
            model: PatientState,
            as: 'PatientStates',
            where: {
              date: date
            }
          },
          {
            model: Description,
            as: 'Descriptions',
            where: {
              date: date
            }
          }
        ]
      });
    } else if (isEmpty(firstName) && !isEmpty(lastName) && !isEmpty(date)) {
      searchResults = await Patient.findAll({
        where: {
          lastName: lastName
        },
        include: [
          {
            model: PatientState,
            as: 'PatientStates',
            where: {
              date: date
            }
          },
          {
            model: Description,
            as: 'Descriptions',
            where: {
              date: date
            }
          }
        ]
      });
    } else if (!isEmpty(firstName) && isEmpty(lastName) && !isEmpty(date)) {
      searchResults = await Patient.findAll({
        where: {
          firstName: firstName
        },
        include: [
          {
            model: PatientState,
            as: 'PatientStates',
            where: {
              date: date
            }
          },
          {
            model: Description,
            as: 'Descriptions',
            where: {
              date: date
            }
          }
        ]
      });
    } else if (!isEmpty(firstName) && !isEmpty(lastName) && isEmpty(date)) {
      searchResults = await Patient.findAll({
        where: {
          firstName: firstName
        },
        include: [
          {
            model: PatientState,
            as: 'PatientStates',
          },
          {
            model: Description,
            as: 'Descriptions',
          }
        ]
      });
    } else if (!isEmpty(firstName) && isEmpty(lastName) && isEmpty(date)) {
      searchResults = await Patient.findAll({
        where: {
          firstName: firstName
        },
        include: [
          {
            model: PatientState,
            as: 'PatientStates',
          },
          {
            model: Description,
            as: 'Descriptions',
          }
        ]
      });
    } else if (isEmpty(firstName) && !isEmpty(lastName) && isEmpty(date)) {
      searchResults = await Patient.findAll({
        where: {
          lastName: lastName
        },
        include: [
          {
            model: PatientState,
            as: 'PatientStates',
          },
          {
            model: Description,
            as: 'Descriptions',
          }
        ]
      });
    } else if (isEmpty(firstName) && isEmpty(lastName) && !isEmpty(date)) {
      searchResults = await Patient.findAll({
        include: [
          {
            model: PatientState,
            as: 'PatientStates',
            where: {
              date: date
            }
          },
          {
            model: Description,
            as: 'Descriptions',
            where: {
              date: date
            }
          }
        ]
      });
    } else if (isEmpty(firstName) && isEmpty(lastName) && isEmpty(date)) {
      searchResults = await Patient.findAll({
        include: [
          {
            model: PatientState,
            as: 'PatientStates'
          },
          {
            model: Description,
            as: 'Descriptions'
          }
        ]
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
    await PatientState.destroy({
      where: { patientId: req.params.tempId }
    });
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
  const patient = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    tempName: req.body.tempName
  };

  const history = {
    allergies: req.body.history.allergies,
    currentMeds: req.body.history.currentMeds,
    medicalHistory: req.body.history.medicalHistory,
    socialHistory: req.body.history.socialHistory,
    familyHistory: req.body.history.familyHistory
  }

  const state = {
    bp: req.body.state.bp,
    pulse: req.body.state.pulse,
    respRate: req.body.state.respRate,
    temp: req.body.state.temp,
    height: req.body.state.height,
    weight: req.body.state.weight,
    bmi: req.body.state.bmi,
    date: req.body.date
  };

  const description = {
    chiefComplaint: req.body.description.chiefComplaint,
    hpi: req.body.description.hpi,
    subject: req.body.description.subject,
    objective: req.body.description.objective,
    assessment: req.body.description.assessment,
    plan: req.body.description.plan,
    date: req.body.date
  }

  const { errors, isValid } = validatePrintDataInput(patient);

  if (!isValid) {
    return res.status(400).json(errors);
  }

}