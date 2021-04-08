const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth')

router.get('/', withAuth, async (req, res) => {
    try {
      const userData = await User.findAll({
        attributes: { exclude: ['password'] },
        order: [['username', 'ASC']],
      });
  
      const users = userData.map((post) => post.get({ plain: true }));
  
      res.render('dashboard', {
        users,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.post('/signup', async (req,res)=>{
    
    const newUserData= await User.create(req.body);
    //add name, email and password to/from model user
    req.session.save(() => {
        req.session.user_id = newUserData.id;
        req.session.logged_in = true;
        
        res.json({ 
            user: {
                username: newUserData.get('username'),
                email: newUserData.get('email'),
                password:('password')
            }, 
            message: 'You are now logged in!',
         });

});
});

router.post('/login', async (req, res) => {
  try {
    const userDataId = await User.findOne({ where: { email: req.body.email } });

    if (!userDataId) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userDataId.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userDataId.id;
      req.session.logged_in = true;
      
      res.json({ user: userDataId, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
router.put('/:id', async (req, res) => {
    const updatedUserData = await User.update(req.body, { where: { id: req.params.id } })
    res.json(updatedUserData)
  })
  router.delete('/:id', async (req, res) => {
    const deletedUser = await User.destroy({ where: { id: req.params.id } })
    res.json(deletedUser)
  })



module.exports = router;
