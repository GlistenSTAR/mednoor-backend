const express = require('express');

const templateController = require('../controllers/templates');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.post('/createTemp', isAuth, templateController.saveTemplate);

router.post('/printTemp', isAuth, templateController.printTemplate);

router.post('/searchTemp', isAuth, templateController.searchTemplate);

router.delete('/deleteTemp/:tempId', isAuth, templateController.deleteTemplate);

router.put('/updateTemp/:tempId', isAuth, templateController.updateTemplate);

router.get('/getModels', isAuth, templateController.searchModel);

router.post('/saveModel', isAuth, templateController.createAndUpdateModel);

router.delete('/deleteModel/:modelId', isAuth, templateController.deleteModel);

module.exports = router;