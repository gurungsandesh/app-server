const express = require('express');
const authController = require('../controller/auth.controller');
const router = express.Router();
const verifySignUp = require("../middleware/verifySignUp")
const authJwt = require("../middleware/authJwt")

router
    .route('/signup')
    .post([verifySignUp.checkDuplicateUsernameOrEmail], authController.signup)

router
    .route('/signin')
    .post([authJwt.verifyToken], authController.signin)


module.exports = router;


