const express = require('express');

const templateController = require('../controllers/templates');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.post('/createTemp', isAuth, templateController.saveTemplate);

module.exports = router;