const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection')


router.get('/', async (req,res)=>{
    try{
    const postData= await Post.findAll({
        attributes: [
            'id',
            'title',
            'created_at',
            'text_area'
        ],
      order: [['created_at', 'DESC']],
      include: [
        // Comment model here -- attached username to comment
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        },
      ]

    });

const posts = postData.map((post)=>
post.get({plain:true}));
res.render('posts', {
    posts})
} catch (err){
    console.log(err);
    res.status(500).json(err);
}
});
    


router.get('/', async (req, res)=>{
    try{
        const onePost = await Post.findByPk({
            where: {
                id: req.params.id
              },
              attributes: [
                'id',
                'title',
                'created_at',
                'text_area'
              ],
              include: [
                // include the Comment model here:
                {
                  model: User,
                  attributes: ['username']
                },
                {
                  model: Comment,
                  attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                  include: {
                    model: User,
                    attributes: ['username']
                  }
                }
              ]
        });
        
            if(!onePost){
                res.status(404).json({message: 'No post found'}); return;
            }
            res.render('post/:id', {onePost});
        
        }
        catch (err) {
        console.log(err);
        res.status(500).json(err);
    }}
);

router.post('/', withAuth, async(req,res)=>{
    try{
        const newPostData= await Post.create({
            title: req.body.title,
            text_area: req.body.text_area,
            user_id: req.session.user_id
        })
        res.json(newPostData.id);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

router.put('/', withAuth, async (req,res)=>{
    try{
        const updatePost= await Post.update({
            title: req.body.title,
            text_area: req.body.text_area
      },
      {
        where: {
            id: req.params.id
        }
      })
        if(!updatePost){
            res.status(404).json({message: 'No post with this id.'});
            
        }
        res.json(updatePost);
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
        
    });   
    router.delete('/:id', withAuth, async (req,res)=>{
        try{
            const deletePost= await Post.destroy({
                where:{
                id:req.params.id,
            }});
            if(!deletePost){
                res.status(404).json({message: 'No post with this id.'});
                return;
            }
            res.json(deletePost);
        } catch (err){
            console.log(err);
            res.status(500).json(err);
        }
            
        });   
    



module.exports = router;



    
    