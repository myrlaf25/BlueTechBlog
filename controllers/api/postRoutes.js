const router = require('express').Router();
const { Post } = require('../../models');

router.get('/', async(req, res)=>{
    try{
        const postData = await Post.findAll({
            include: [
                {model: Comment,User  
                // attributes: ['id', 'title', 'text_area', 'comment_text', 'user_id', 'created_at', 'email_username', 'post_id' ]
            },
            ],
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


module.exports = router;