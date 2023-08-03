const router = require('express').Router();
const homeRoutes = require('./homeController');
const authRoutes = require('./authController')
const dashboardRoutes = require('./dashboardController')
const commentRoutes = require('./commentController');


router.use('/', homeRoutes);

router.use('/', authRoutes);

router.use('/', dashboardRoutes)

router.use('/', commentRoutes);

module.exports = router;
