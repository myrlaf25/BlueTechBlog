const router = require('express').Router();
const { User, Comment, Post } = require('../models');
const sequelize=require('../config/connection');
const withAuth = require('../utils/auth');



router.get('/', (req,res)=>{
    res.render('homepage');
})

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;