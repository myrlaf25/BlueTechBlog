const router = require('express').Router();
const { User, Comment, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id', 'title', 'text_area', 'created_at'
            ],
            include: [
                {
                    model: Comment, User,
                    attributes: ['id', 'comment_text', 'user_id', 'created_at', 'username', 'email_username']
                },
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true })
        ); console.log(posts);
        res.render('dashboard', {
            posts, logged_in: true
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
);
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postId = await Post.findByPk({
            where: {
                id: req.params.id
            },
            attributes: [
                'id', 'title', 'text_area', 'created_at'
            ],
            include: [
                {
                    model: Comment, User,
                    attributes: ['id', 'comment_text', 'user_id', 'created_at', 'username']
                },
            ],
        });
        postId => {
            if (!postId) {
                res.status(404).json({ message: 'No post found' });
            }
        }
        const post = postId.get({ plain: true });
        res.render('edit-post', { post, logged_in: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
);

router.get('/new', async (req, res) => {
    res.render('newPost');
});


module.exports = router;