const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth')
// //GET /api/users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['[password'] }
        });

        res.json(userData);

    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});
//GET /api/users/1
router.get('/:id', async (req,res)=> {
    try{
        const data = await User.findOne({
        attributes: { exclude: ['password']},
        where: {
          id: req.params.id
        },
        include: [
            {
              model: Post,
              attributes: ['id', 'title', 'content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                  model: Post,
                  attributes: ['title']
                }
            }
          ]

    })
    if (!data){
        res.status(404).json({message: 'No user found.'})
        return;
    }
    res.json(data);
    }catch (err){
        console.log(err);
        res.status(500).json(err)
    }
})





router.post('/signup', async (req, res) => {
    try{
    const userData = await User.create(req.body);
    //add name, email and password to/from model user
    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.loggedIn = true;

        res.json({
            user: {
                username: userData.get('username'),
                email: userData.get('email'),
                password: userData.get('password')
            },
            message: 'You are now logged in!',
        });
    
    });
} catch(err){
    console.log(err)
    res.status(500).json(err)
}
});
//POST /api/users
// router.post('/', withAuth, async (req, res) => {
//     try{

//         const userData = await User.create({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password
//         })
//             req.session.save(() => {
//                 req.session.user_id = userData.id;
//                 req.session.username = userData.username;
//                 req.session.loggedIn = true;

//                 res.json(userData);
//             });
//         }   catch(err){
//             console.log(err);
//             res.status(500).json(err);
//         };
// });
//login
router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
       
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.loggedIn = true;
        res.json({ user: userData, message: 'You are now logged in!' });
      });
    
  
    } catch (err) {
     
      res.status(400).json(err);
    }
  });

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    } 
});
router.put('/:id', withAuth, async (req, res) => {
    try{
    const userData = await User.update(req.body, 
        { where: { id: req.params.id } })
    res.json(userData)
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }

})
router.delete('/:id', withAuth, async (req, res) => {
    try{
    const userData = await User.destroy({ 
        where: { id: req.params.id } })
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });}
    res.json(userData)
        } catch (err) {
            console.log(err)
            res.status(400).json(err);
        }
})



module.exports = router;
