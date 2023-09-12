const express = require('express');
const authController = require('../controller/auth.controller');
const router = express.Router();
const verifySignUp = require("../middleware/verifySignUp")



router
    .route('/signup')
    .post([verifySignUp.checkDuplicateUsernameOrEmail], authController.signup)

router
    .route('/signin')
    .post(authController.signin)


module.exports = router;


