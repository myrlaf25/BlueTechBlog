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
                    attributes: ['id', 'comment_text', 'user_id', 'created_at', 'name', 'email_username']
                },
            ],
        });
        const posts = postData.map((posts) => posts.get({ plain: true })
        ); console.log(posts);
        res.render('dashboard-postinfo', {
            posts, logged_in: true
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
);
router.get('/:id', withAuth, async (req, res) => {
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
        res.render('dashboard/edit/', { post, logged_in: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
);

router.get('new', async (req, res) => {
    res.render('/new', postData);
});


module.exports = router;