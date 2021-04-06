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

router.get('/:id', async (req, res)=>{
    try{
        const commentId = await Comment.findAll({
            where: {
                id: req.params.id
            }
        });
        commentId=>{
            res.json(commentId);
            
        }
        }
        catch (err) {
        console.log(err);
        res.status(500).json(err);
    }}
);

router.post('/', withAuth, async(req,res)=>{
    try{
        const createComment= await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.body.user_id,
        })
        res.json(createComment);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

router.put('/:id', withAuth, async (req,res)=>{
    try{
        const updateComment= await Comment.update({
            comment_text: req.body.comment_text,
        }, {Where:{
            id:req.body.id,
        }});
        if(!updateComment){
            res.status(404).json({message: 'No comment with this id.'});
            return;
        }
        res.status(200).json(updateComment);
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
        
    });   
    router.delete('/:id', withAuth, async (req,res)=>{
        try{
            const deleteComment= await Comment.destroy({
                Where:{
                id:req.body.id,
            }});
            if(!deleteComment){
                res.status(404).json({message: 'No comment with this id.'});
                return;
            }
            res.status(200).json(deleteComment);
        } catch (err){
            console.log(err);
            res.status(500).json(err);
        }
            
        });   
    



module.exports = router;