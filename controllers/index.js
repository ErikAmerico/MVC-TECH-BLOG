const router = require('express').Router();
const homeRoutes = require('./homeController');
const dashboardRoutes = require('./dashboardController')
const commentRoutes = require('./commentController');
const authRoutes = require('./authController')

router.use('/home', homeRoutes);

router.use('/auth', authRoutes);

router.use('/dashboard', dashboardRoutes)

router.use('/comments', commentRoutes);

module.exports = router;
