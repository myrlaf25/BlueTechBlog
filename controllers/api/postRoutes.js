const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');


router.get('/', async(req, res)=>{
    try{
        const postData = await Post.findAll({
            attributes: ['id', 'title', 'text_area'],
            include: [
                {model: Comment, 
                attributes: ['id', 'comment_text', 'user_id', 'post_id', 'user_id']}, 
                {model:User, attributes: ['id', 'email_username']}]
            });
            const posts = postData.map((posts)=> posts.get({plain: true})
            );
            // res.render('homepage', {
            //     posts
            // }); 

            res.status(200).json(postData);
        } catch (err){
        console.log(err);
        res.status(500).json(err);
    }});
    


router.get('/:id', async (req, res)=>{
    try{
        const postId = await Post.findAll({
            where: {
                id: req.params.id
            }
        });
        postId=>{
            res.json(postId);
            
        }
        }
        catch (err) {
        console.log(err);
        res.status(500).json(err);
    }}
);

router.post('/', withAuth, async(req,res)=>{
    try{
        const createPost= await Post.create({
            text_area: req.body.text_area,
            user_id: req.body.user_id,
        })
        res.json(createPost);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

router.put('/:id', withAuth, async (req,res)=>{
    try{
        const updatePost= await Post.update({
            text_area: req.body.text_area,
        }, {Where:{
            id:req.body.id,
        }});
        if(!updatePost){
            res.status(404).json({message: 'No post with this id.'});
            return;
        }
        res.status(200).json(updatePost);
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
        
    });   
    router.delete('/:id', withAuth, async (req,res)=>{
        try{
            const deletePost= await Post.destroy({
                Where:{
                id:req.body.id,
            }});
            if(!deletePost){
                res.status(404).json({message: 'No post with this id.'});
                return;
            }
            res.status(200).json(deletePost);
        } catch (err){
            console.log(err);
            res.status(500).json(err);
        }
            
        });   
    



module.exports = router;