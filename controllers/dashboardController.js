const express = require('express');
const router = express.Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/dashboard', withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({ where: { user_id: req.session.userId }, include: User });
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: req.session.loggedIn, isDashboardPage: true });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get('/new', (req, res) => {
  res.render('new-post', { loggedIn: req.session.loggedIn });
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

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const postData = await Post.findOne({
      where: { id: postId },
      include: User,
    });
    if (!postData) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    const post = postData.get({ plain: true });
    res.render('edit-post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



router.put('/update/:id', withAuth, async (req, res) => {
  console.log(req.body)
  try {
    const title = req.body.title;
    const content = req.body.content;
    const id = req.params.id; 

    await Post.update(
      { title, content },
      {
        where: {
          id: id,
        },
      }
    );

  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).send('Error updating post.');
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {

    const postId = req.params.id;
     console.log('Post ID to be deleted:', postId);

    await Post.destroy({
      where: {
        id: postId,
      },
    });

    res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).send('Error deleting post.');
  }
});



module.exports = router;
