const router = require('express').Router();
const homeRoutes = require('./homeController');
const authRoutes = require('./authController')
const dashboardRoutes = require('./dashboardController')
const commentRoutes = require('./commentController');


router.use('/home', homeRoutes);

router.use('/auth', authRoutes);

router.use('/dashboard', dashboardRoutes)

router.use('/comments', commentRoutes);

module.exports = router;
