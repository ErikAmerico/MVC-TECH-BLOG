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
      //res.status(200).json(userData);
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
      res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;
      //res.status(200).json({ user: userData, message: 'You are now logged in!' });
      res.redirect('/dashboard');
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect('/home');
      //res.status(204).end();
    });
    //end();
  } else {
    res.redirect('/home');
    //res.status(404).end();
    //end();
  }
});

module.exports = router;

