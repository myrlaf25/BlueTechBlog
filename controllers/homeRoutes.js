const router = require('express').Router();
const { User, Comment, Post } = require('../models');
const sequelize=require('../config/connection');
const withAuth = require('../utils/auth')

router.get('/', async(req, res)=>{
    try{
        const postData = await Post.findAll({
            attributes: ['id', 'title', 'text_area'],
            include: [
                {model: Comment, 
                attributes: ['id', 'comment_text', 'user_id', 'post_id', 'user_id']}, 
                {model:User, attributes: ['id', 'email_username']}]
            });
        const posts = postData.map((post)=> post.get({plan: true})
        );
        res.render('homepage', {
            posts
        }); 
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


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
