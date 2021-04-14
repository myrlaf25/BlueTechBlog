const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('.././utils/auth');
const router = require('express').Router();
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
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
            }
            ]
        })
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk({
            attributes: ['title', 'content', 'created_at'],
            include: [{ model:User, 
            attributes: ['username']}], 
            include:[{ model:Comment,
                attributes: ['id', 'comment_text', 'created_at'], 
            }]
        })
        const post = postData.get({ plain: true });
        res.render('post-info', {
            ...post, 
            
        })
        
    }
    catch (err) {
        res.status(500).json(err);
    }
});
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});


router.get('/posts-comments', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'title',
            'created_at'
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
        ],
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            const post = dbPostData.get({ plain: true });

            res.render('posts-comments', { post, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;