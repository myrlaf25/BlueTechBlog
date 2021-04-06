const router = require('express').Router();
const { User, Comment, Post } = require('../../models');
const withAuth=require('../../utils/auth');

router.get('/', withAuth, async (req, res)=>{
    try{
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id', 'title', 'text_area', 'created_at'
            ], 
            include: [
                {model: Comment,User,  
                attributes: ['id', 'comment_text', 'user_id', 'created_at', 'email_username']
            },
            ],
        });
        const posts = postData.map((post)=> post.get({plain: true})
        );
        res.render('dashboard', {
            posts, loggedIn:true});
        }
        catch (err) {
        console.log(err);
        res.status(500).json(err);
    }}
);
router.get('/edit/:id', withAuth, async (req, res)=>{
    try{
        const postData = await Post.findAll({
            where: {
                id: req.params.id
            },
            attributes: [
                'id', 'title', 'text_area', 'created_at'
            ], 
            include: [
                {model: Comment,User,  
                attributes: ['id', 'comment_text', 'user_id', 'created_at', 'email_username']
            },
            ],
        });
        postData=>{
            if(!postData){
                res.status(404).json({message: 'No post found'});
            }
        }
        const post = postData.get({plain: true});
        res.render('edit-post', {post, loggedIn:true});
        }
        catch (err) {
        console.log(err);
        res.status(500).json(err);
    }}
);

router.get('new', async (req,res)=>{
    res.render('new-post');
});


module.exports = router;