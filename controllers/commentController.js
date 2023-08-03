const express = require('express');
const router = express.Router();
const { Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.post('/comment', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({ ...req.body, user_id: req.session.userId });
    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
