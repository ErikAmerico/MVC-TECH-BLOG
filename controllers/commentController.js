const express = require('express');
const router = express.Router();
const { Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.post('/comment', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({ 
      ...req.body,
      user_id: req.session.userId,
      post_id: req.body.post_id,
    });
    res.render('partials/comments', newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
