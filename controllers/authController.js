const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
})

router.post('/signup', async (req, res) => {
  console.log(req.body)
  try {
    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;
      res.redirect('/dashboard');
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { name: req.body.name } });
    if (!userData) {
      return res.send('<script>alert("Incorrect username or password. Please try again!"); window.history.back();</script>');
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      return res.send('<script>alert("Incorrect username or password. Please try again!"); window.history.back();</script>');
    }
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;
      res.redirect('/dashboard');
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/edit/:id', async (req, res) => {
  try {
    const [updatedRows] = await Post.update(
      { title: req.body.title, content: req.body.content },
      { where: { id: req.params.id, user_id: req.session.userId } }
    );
    if (updatedRows > 0) {
      res.redirect('/dashboard');
    } else {
      res.status(404).json({ message: 'Post not found or no changes were made' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;

