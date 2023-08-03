const express = require('express');
const router = express.Router();
const { Post, Comment, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({ include: User });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('homepage', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const postData = await Post.findByPk(postId, { include: User });

    res.render('single-post', { post: postData.get({ plain: true }) });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
