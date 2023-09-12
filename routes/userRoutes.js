const express = require('express');
const routesController = require('./../controller/routes.controller');
const verifyAdd = require("../middleware/verifySignUp")

const router = express.Router();

router
    .route('/account')
    .get(routesController.getAllAccount)
    .post([verifyAdd.checkDuplicateAccounts], routesController.addAccount)


module.exports = router;