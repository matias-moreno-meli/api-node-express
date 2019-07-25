var express = require('express');
var router = express.Router();
var agenciesController = require('../controllers/agencies-controller');

router.post('/', agenciesController.saveAgency);

module.exports = router;
