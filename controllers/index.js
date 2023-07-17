const router = require('express').Router();
const homeRoutes = require('./homeController');
const dashboardRoutes = require('./dashboardController')
const commentRoutes = require('./commentController');
const postRoutes = require('./postController');
const authRoutes = require('./authController')
//const userRoutes = require('./userController');

router.use('/home', homeRoutes);

router.use('/auth', authRoutes);

router.use('/dashboard', dashboardRoutes)

router.use('/comments', commentRoutes);

router.use('/posts', postRoutes);

//router.use('/users', userRoutes);

module.exports = router;
