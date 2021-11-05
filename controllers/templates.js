const Patient = require('../models').Patient;
const PatientState = require('../models').PatientState;
const Description = require('../models').Description;

const validatePatientInput = require('../validation/patient');

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
    const result = await Patient.create({
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