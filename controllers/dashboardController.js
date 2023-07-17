const express = require('express');
const router = express.Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({ where: { user_id: req.session.userId }, include: User });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/new', (req, res) => {
  res.render('new-post');
});

router.post('/new', async (req, res) => {
  try {
    const userId = req.session.userId;

    const newPostData = {
      title: req.body.title,
      content: req.body.content,
      user_id: userId,
    };

    const newPost = await Post.create(newPostData);

    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
