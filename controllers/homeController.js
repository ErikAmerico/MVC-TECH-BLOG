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

    const commentData = await Comment.findAll({
      where: { post_id: postId},
      include: User,
      order: [['createdAt', 'DESC']]
    });

    const comments = commentData.map(comment => {
      return {
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        username: comment.dataValues.user.name,
      };
    });
    res.render('single-post', {
      post: postData.get({ plain: true }),
      loggedIn: req.session.loggedIn,
      comments,
      postId
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
