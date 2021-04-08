const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth= require('../../utils/auth');

router.get('/', async (req,res)=>{
    try{
    const commentData= await Comment.findAll({});

const comments = commentData.map((comment)=>
comment.get({plain:true}));
res.render('comments', {
    comments})
} catch (err){
    console.log(err);
    res.status(500).json(err);
}
});



router.post('/', withAuth, async(req,res)=>{
    try{
        if (req.session){
        const commentData= await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        })
        res.json(commentData);
    } 
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})


    router.delete('/:id', withAuth, async (req,res)=>{
        try{
            const commentData= await Comment.destroy({
                Where:{
                id:req.params.id,
            }});
            if(!commentData){
                res.status(404).json({message: 'No comment with this id.'});
                
            }
            res.json(commentData)
        } catch (err){
            console.log(err);
            res.status(500).json(err);
        }
            
        });   
    



module.exports = router;