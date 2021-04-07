const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection')


router.get('/', async(req, res)=>{
    try{
        const postData = await Post.findAll({
            attributes: ['id', 'title', 'text_area'],
            include: [
                {model: Comment, 
                attributes: ['id', 'comment_text', 'user_id', 'post_id', 'user_id']}, 
                {model:User, attributes: ['username']}]
            });
            postData, async(req,res)=>{
                
            const posts = await postData.map((posts=> posts.get({plain: true})));
            res.render('dashboard', {
                posts, logged_in:true
            }); 
        } 
    } catch (err){
        console.log(err);
        res.status(500).json(err);
}});
    


router.get('/post:id', async (req, res)=>{
    try{
        const postData = await Post.findByPk({
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
                res.status(404).json({message: 'No post found'}); return;
            }
            res.render('post/:id', { postData, logged_in: req.session.logged_in});
        }
        }
        catch (err) {
        console.log(err);
        res.status(500).json(err);
    }}
);

router.post('/', withAuth, async(req,res)=>{
    try{
        const postData= await Post.create({
            text_area: req.body.text_area,
            user_id: req.body.user_id,
        })
        res.json(postData);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

router.put('/:id', withAuth, async (req,res)=>{
    try{
        const postData= await Post.update({
            text_area: req.body.text_area,
        }, {Where:{
            id:req.body.id,
        }});
        if(!postData){
            res.status(404).json({message: 'No post with this id.'});
            return;
        }
        res.status(200).json(postData);
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
        
    });   
    router.delete('/:id', withAuth, async (req,res)=>{
        try{
            const postData= await Post.destroy({
                Where:{
                id:req.body.id,
            }});
            if(!postData){
                res.status(404).json({message: 'No post with this id.'});
                return;
            }
            res.status(200).json(postData);
        } catch (err){
            console.log(err);
            res.status(500).json(err);
        }
            
        });   
    



module.exports = router;