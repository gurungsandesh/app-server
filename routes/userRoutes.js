const express = require('express');
const routesController = require('./../controller/routes.controller');

const router = express.Router();

router
    .route('/routes')
    .post(routesController.routes)
    .get(routesController.getRoutes)

router
    .route("/toplace")
    .get(routesController.getToPlace)

router
    .route("/fromplace")
    .get(routesController.getFromPlace)

// router
//     .route('/:id')
//     .get(routesController.getUser)
//     .patch(routesController.updateUser)
//     .delete(routesController.deleteUser);

module.exports = router;