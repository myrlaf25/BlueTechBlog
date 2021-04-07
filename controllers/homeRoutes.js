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
                attributes: ['id', 'comment_text', 'user_id', 'post_id']}, 
                {model:User, attributes: ['username']}]
            });
        const posts = postData.map((post)=> Post.get({plain: true})
        );
        res.render('homepage', {
            posts
        }); 
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// router.get('/', (req,res)=>{
//     res.render('homepage');
// })

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});
router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/post/:id', async (req, res)=>{
    try{
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [ 'id', 'title', 'text_area'], 
            include:[{
                model:Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id'], 
            include: [{
                model: User, 
                attributes: ['username']
            }]
        }]
        });
        postData=>{
            if(!postData){
                res.status(404).json({message: 'No post found'}); return;
            }
            res.render('/post/:id', { post, logged_in: req.session.logged_in});
        }
        }
        catch (err) {
        console.log(err);
        res.status(500).json(err);
    }}
);

router.get('/posts-comments', async (req, res)=>{
    try{
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'comment_text', 'post_id', 'user_id'], 
            include: [{
                model: User, 
                attributes: ['username']
            }]
        });
        postData=>{
            if(!postData){
                res.status(404).json({message: 'No post-comments found'}); return;
            }
            res.render('posts-comments', { post, logged_in: req.session.logged_in});
        }
        }
        catch (err) {
        console.log(err);
        res.status(500).json(err);
    }}
);


module.exports = router;
